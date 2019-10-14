import * as functions from 'firebase-functions';

import { UserLikes } from './models/user-likes';
import { LibraryService } from './library.service';
import { likesLibraryId } from './models/library';

export async function onUserLikesWriteAsync(
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
  context: functions.EventContext
): Promise<void> {
  const after = change.after.data() as UserLikes;
  const before = change.before.data() as UserLikes;

  const afterResourceIds = after ? after.resourceIds || [] : [];
  const beforeResourceIds = before ? before.resourceIds || [] : [];

  const addedResourceIds = afterResourceIds.filter(x => beforeResourceIds.indexOf(x) === -1);
  const removedResourceIds = beforeResourceIds.filter(x => afterResourceIds.indexOf(x) === -1);

  const libraryService = new LibraryService();

  if (addedResourceIds.length) {
    addedResourceIds.forEach(async resourceId => {
      await libraryService.addResourceAsync(resourceId, likesLibraryId, change.after.id, context.timestamp);
    });
  }

  if (removedResourceIds.length) {
    removedResourceIds.forEach(async resourceId => {
      await libraryService.deleteResourceAsync(resourceId, likesLibraryId, change.after.id);
    });
  }
}
