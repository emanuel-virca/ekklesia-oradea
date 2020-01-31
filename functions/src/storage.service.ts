import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as os from 'os';
import * as path from 'path';

import * as sharp from 'sharp';
import * as fs from 'fs-extra';

// Thumbnail prefix added to file names.
export const THUMB_PREFIX = 'thumb_';

// Width of the thumbnail in pixels.
const THUMB_WIDTH = 500;

export class StorageService {
  public async generateThumbnail(object: functions.storage.ObjectMetadata): Promise<string> {
    const filePath = object.name;
    const contentType = object.contentType; // This is the image MIME type
    const fileDir = path.dirname(filePath);
    const fileName = path.basename(filePath);

    const thumbFilePath = path.normalize(path.join(fileDir, `${THUMB_PREFIX}${fileName}`));
    const tempLocalFile = path.join(os.tmpdir(), filePath);
    const tempLocalDir = path.dirname(tempLocalFile);
    const tempLocalThumbFile = path.join(os.tmpdir(), thumbFilePath);

    // Exit if this is triggered on a file that is not an image.
    if (!object.contentType.startsWith('image/')) {
      console.log('This is not an image.');
      return null;
    }

    // Exit if the image is already a thumbnail.
    if (fileName.startsWith(THUMB_PREFIX)) {
      console.log('Already a Thumbnail.');
      return null;
    }

    // Cloud Storage files.
    const bucket = admin.storage().bucket(object.bucket);
    const file = bucket.file(filePath);
    const thumbFile = bucket.file(thumbFilePath);
    const metadata = {
      contentType: contentType,
      'Cache-Control': 'public,max-age=3600',
    };

    // Create the temp directory where the storage file will be downloaded.
    await fs.ensureDir(tempLocalDir);

    // Download file from bucket.
    await file.download({ destination: tempLocalFile });

    console.log('The file has been downloaded to', tempLocalFile);

    // Generate a thumbnail using Sharp
    await sharp(tempLocalFile)
      .resize({ width: THUMB_WIDTH })
      .toFile(tempLocalThumbFile);

    // Uploading the Thumbnail.
    await bucket.upload(tempLocalThumbFile, { destination: thumbFilePath, metadata: metadata });
    console.log('Thumbnail uploaded to Storage at', thumbFilePath);

    // Once the image has been uploaded delete the local files to free up disk space.
    fs.unlinkSync(tempLocalFile);
    fs.unlinkSync(tempLocalThumbFile);

    // Get the Signed URLs for the thumbnail and original image.
    const signedUrl = await thumbFile.getSignedUrl({ action: 'read', expires: '03-01-2500' });
    console.log('Thumbnail available at', signedUrl);

    return signedUrl[0];
  }
}
