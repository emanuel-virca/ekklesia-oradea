import * as functions from 'firebase-functions';
import * as path from 'path';

import { StorageService } from './storage.service';
import { RESOURCES_STORAGE_FOLDER } from './models/resource';

export async function onFileWriteAsync(object: functions.storage.ObjectMetadata) {
  const service = new StorageService();

  const fileDir = path.dirname(object.name);

  if (fileDir.includes(RESOURCES_STORAGE_FOLDER)) await service.generateThumbnail(object);
}
