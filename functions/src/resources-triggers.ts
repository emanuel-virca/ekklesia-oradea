import * as functions from 'firebase-functions';
import * as probeImageSize from 'probe-image-size';

import { AlgoliaConfig } from './algolia.config';
import { WebPortalConfig } from './web-portal.config';
import { Resource, RESOURCES_STORAGE_FOLDER } from './models/resource';
import { Image } from './models/image';
import { ResourceSearchService } from './resource-search.service';
import { MessagingService } from './messaging/messaging.service';
import { ResourceSnippetService } from './resource-snippet.service';
import { LibraryService } from './library.service';
import { UserLikesService } from './user-likes.service';
import { THUMB_PREFIX } from './storage.service';

export async function onResourceCreateAsync(
  snap: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext,
  algoliaConfig: AlgoliaConfig
): Promise<void> {
  const resource = snap.data() as Resource;

  resource.id = snap.id;

  await processCoverImage(snap.ref, resource.cover);

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
    await processCoverImage(change.after.ref, after.cover);
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
  const notificationService = new MessagingService();
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

async function processCoverImage(ref: FirebaseFirestore.DocumentReference, cover: Image): Promise<void> {
  if (!cover || !cover.url) return;

  const dimensions = await probeImageSize(cover.url);

  if (!dimensions) return;

  const slashEncode = encodeURIComponent('/');

  const resource: Partial<Resource> = {
    cover: {
      ...cover,
      width: dimensions.width,
      height: dimensions.height,
      thumbnailUrl: cover.url
        .replace(
          `/${RESOURCES_STORAGE_FOLDER}${slashEncode}`,
          `/${RESOURCES_STORAGE_FOLDER}${slashEncode}${THUMB_PREFIX}`
        )
        .split('&')[0],
    },
  };

  await ref.set(resource, { merge: true });
}

async function updateSearchService(algoliaConfig: AlgoliaConfig, after: Resource, before: Resource = null) {
  const resourceSearchService = new ResourceSearchService(algoliaConfig);

  // resource is published
  if (before && !before.published && after.published) {
    await resourceSearchService.addAsync(after);
    return;
  }

  // resource is unpublished
  if (before && before.published && !after.published) {
    await resourceSearchService.deleteAsync(after.id);
    return;
  }

  // resource is newly created
  if (!before && before.published && after.published) {
    await resourceSearchService.addAsync(after);
    return;
  }

  // resource is updated
  if (before && before.published && after.published) {
    await resourceSearchService.updateAsync(after);
    return;
  }
}
