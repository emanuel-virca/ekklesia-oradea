import * as functions from 'firebase-functions';
import * as probeImageSize from 'probe-image-size';

import { AlgoliaConfig } from './algolia.config';
import { WebPortalConfig } from './web-portal.config';
import { Resource } from './models/resource';
import { Image } from './models/image';
import { ResourceSearchService } from './resource-search.service';
import { NotificationService } from './notification/notification.service';
import { ResourceSnippetService } from './resource-snippet.service';
import { LibraryService } from './library.service';
import { UserLikesService } from './user-likes.service';

export async function onResourceCreateAsync(
  snap: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext,
  algoliaConfig: AlgoliaConfig
): Promise<void> {
  const resource = snap.data() as Resource;

  resource.id = snap.id;

  await computeImageDimensions(snap.ref, resource.cover);

  const tasks = [];

  // search
  tasks.push(updateSearchService(algoliaConfig, resource));

  // resource snippets
  const resourceSnippetService = new ResourceSnippetService();
  const snippetTask = resourceSnippetService.addAsync(resource);

  tasks.push(snippetTask);

  await Promise.all(tasks);
}

export async function onResourceUpdateAsync(
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
  context: functions.EventContext,
  algoliaConfig: AlgoliaConfig,
  webPortalConfig: WebPortalConfig
): Promise<void> {
  const before = change.before.data() as Resource;
  const after = change.after.data() as Resource;

  after.id = change.after.id;

  // image dimensions

  const oldImageUrl = before.cover ? before.cover.url : null;
  const newImageUrl = after.cover ? after.cover.url : null;

  if (newImageUrl !== oldImageUrl) {
    await computeImageDimensions(change.after.ref, after.cover);
  }

  const tasks = [];

  // resource snippets
  const resourceSnippetService = new ResourceSnippetService();
  tasks.push(resourceSnippetService.updateAsync(after));

  // libraries
  const libraryService = new LibraryService();
  tasks.push(libraryService.updateResourceAsync(after));

  // search
  tasks.push(updateSearchService(algoliaConfig, after, before));

  // notifications
  const notificationService = new NotificationService();
  if (!before.published && after.published) {
    tasks.push(notificationService.sendResourceNotificationAsync(after, webPortalConfig));
  }

  await Promise.all(tasks);
}

export async function onResourceDeleteAsync(
  snap: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext,
  algoliaConfig: AlgoliaConfig
): Promise<void> {
  const resourceSearchService = new ResourceSearchService(algoliaConfig);
  const resourceSnippetService = new ResourceSnippetService();
  const libraryService = new LibraryService();
  const userLikesService = new UserLikesService();

  const taks = [
    resourceSearchService.deleteAsync(snap.id),
    resourceSnippetService.removeAsync(snap.id),
    libraryService.deleteResourceAsync(snap.id),
    userLikesService.unlikeResourceAsync(snap.id),
  ];

  await Promise.all(taks);
}

async function computeImageDimensions(ref: FirebaseFirestore.DocumentReference, image: Image): Promise<void> {
  if (!image || !image.url) return;

  const dimensions = await probeImageSize(image.url);

  if (!dimensions) return;

  const resource: Partial<Resource> = { cover: { width: dimensions.width, height: dimensions.height, url: image.url } };

  await ref.set(resource, { merge: true });
}

async function updateSearchService(algoliaConfig: AlgoliaConfig, after: Resource, before: Resource = null) {
  const publish = !(before && before.published) && after.published;
  const unpublish = before && before.published && !after.published;

  const resourceSearchService = new ResourceSearchService(algoliaConfig);

  const tasks = [];

  if (publish) {
    tasks.push(resourceSearchService.addAsync(after));
  }

  if (unpublish) {
    tasks.push(resourceSearchService.deleteAsync(after.id));
  }

  if (!unpublish && !publish) {
    tasks.push(resourceSearchService.updateAsync(after));
  }

  await Promise.all(tasks);
}
