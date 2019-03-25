import * as functions from 'firebase-functions';
import * as probeImageSize from 'probe-image-size';

import { AlgoliaConfig } from './algolia.config';
import { Resource } from './models/resource';
import { ResourceSearchService } from './resource-search.service';
import { NotificationService } from './notification/notification.service';

export async function onResourceCreateAsync(
  snap: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext,
  algoliaConfig: AlgoliaConfig
): Promise<void> {
  const resource = snap.data() as Resource;
  resource.id = snap.id;

  if (resource.published) {
    const resourceSearchService = new ResourceSearchService(algoliaConfig);

    await resourceSearchService.addAsync(resource);
  }

  await computeImageDimensions(snap.ref, resource.imageSrc);
}

export async function onResourceUpdateAsync(
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
  context: functions.EventContext,
  algoliaConfig: AlgoliaConfig
): Promise<void> {
  const previousData = change.before.data() as Resource;
  const resource = change.after.data() as Resource;
  resource.id = change.after.id;

  const resourceSearchService = new ResourceSearchService(algoliaConfig);
  const notificationService = new NotificationService();

  const publish = !previousData.published && resource.published;
  const unpublish = previousData.published && !resource.published;

  if (unpublish) {
    await resourceSearchService.deleteAsync(resource.id);
  } else if (publish) {
    await resourceSearchService.addAsync(resource);
    await notificationService.sendResourceNotificationAsync(resource);
  } else {
    await resourceSearchService.updateAsync(resource);
  }

  if (resource.imageSrc !== change.before.data().imageSrc) {
    await computeImageDimensions(change.after.ref, resource.imageSrc);
  }
}

export async function onResourceDeleteAsync(
  snap: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext,
  algoliaConfig: AlgoliaConfig
): Promise<void> {
  const resourceSearchService = new ResourceSearchService(algoliaConfig);

  await resourceSearchService.deleteAsync(snap.id);
}

async function computeImageDimensions(ref: FirebaseFirestore.DocumentReference, imageUrl: string): Promise<void> {
  if (!imageUrl) return;

  const dimensions = await probeImageSize(imageUrl);

  if (!dimensions) return;

  await ref.set({ width: dimensions.width, height: dimensions.height }, { merge: true });
}
