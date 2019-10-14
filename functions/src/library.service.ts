import * as admin from 'firebase-admin';

import { Resource, convertToResourceSnippet, ResourceSnippet, resourceSnippetsCollectionName } from './models/resource';
import { LibraryResource, libraryResourcesCollectionName, librariesCollectionName } from './models/library';

export class LibraryService {
  db = admin.firestore();
  librariesCollection = this.db.collection(librariesCollectionName);
  libraryResourcesCollectionGroup = this.db.collectionGroup(libraryResourcesCollectionName);

  public async addResourceAsync(
    resourceId: string,
    libraryName: string,
    userId: string,
    sortNo: any = null
  ): Promise<void> {
    const resourceSnap = await this.db
      .collection(resourceSnippetsCollectionName)
      .doc(resourceId)
      .get();

    if (!resourceSnap.exists) {
      return;
    }

    const libraryResource: LibraryResource = {
      resource: resourceSnap.data() as ResourceSnippet,
      sortNo: sortNo || null,
    };

    await this.librariesCollection
      .doc(`${userId}_${libraryName}`)
      .collection(libraryResourcesCollectionName)
      .doc(resourceId)
      .set(libraryResource);
  }

  public async deleteResourceAsync(
    resourceId: string,
    libraryName: string = null,
    userId: string = null
  ): Promise<void> {
    if (libraryName) {
      await this.librariesCollection
        .doc(`${userId}_${libraryName}`)
        .collection(libraryResourcesCollectionName)
        .doc(resourceId)
        .delete();
    } else {
      // Get a new write batch
      const batch = this.db.batch();

      // remove from all libraries
      const items = await this.libraryResourcesCollectionGroup.where('resource.id', '==', resourceId).get();

      const chunkSize = 100;

      for (let i = 0; i < items.size; i += chunkSize) {
        items.docs.slice(i, i + chunkSize).forEach(x => {
          batch.delete(x.ref);
        });

        await batch.commit();
      }

      // TODO delete resource from likes and history
    }
  }

  public async updateResourceAsync(resource: Resource): Promise<void> {
    const batch = this.db.batch();

    const items = await this.libraryResourcesCollectionGroup.where('resource.id', '==', resource.id).get();

    const chunkSize = 100;

    for (let i = 0; i < items.size; i += chunkSize) {
      items.docs.slice(i, i + chunkSize).forEach(x => {
        const libraryResource: Partial<LibraryResource> = { resource: convertToResourceSnippet(resource) };
        batch.set(x.ref, libraryResource, { merge: true });
      });

      await batch.commit();
    }
  }
}
