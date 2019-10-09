import * as admin from 'firebase-admin';
import { Resource, convertToResourceSnippet } from './models/resource';

export class LibraryService {
  public async addResourceToLibraryAsync(
    libraryName: string,
    resourceId: string,
    userId: string,
    sortNo: any
  ): Promise<void> {
    const db = admin.firestore();

    const resourceSnap = await db.doc(`resources/${resourceId}`).get();

    if (!resourceSnap.exists) {
      return;
    }

    const resource = convertToResourceSnippet({ ...(resourceSnap.data() as Resource), sortNo });
    console.log('snapshot: ', resource);

    await db.doc(`libraries/${userId}_${libraryName}/library-resources/${resourceId}`).set(resource);
  }

  public async removeResourceFromLibraryAsync(libraryName: string, resourceId: string, userId: string): Promise<void> {
    const db = admin.firestore();

    await db.doc(`libraries/${userId}_${libraryName}/library-resources/${resourceId}`).delete();
  }
}
