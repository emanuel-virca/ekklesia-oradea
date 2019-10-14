import * as admin from 'firebase-admin';

import { Resource, convertToResourceSnippet } from './models/resource';

export class ResourceSnippetService {
  resourceSnippetsCollection = admin.firestore().collection('resource-snippets');

  public async addAsync(resource: Resource): Promise<void> {
    await this.resourceSnippetsCollection.doc(resource.id).set(convertToResourceSnippet(resource));
  }

  public async removeAsync(resourceId: string): Promise<void> {
    await this.resourceSnippetsCollection.doc(resourceId).delete();
  }

  public async updateAsync(resource: Resource): Promise<void> {
    await this.resourceSnippetsCollection.doc(resource.id).set(convertToResourceSnippet(resource));
  }
}
