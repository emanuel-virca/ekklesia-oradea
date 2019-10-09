import * as functions from 'firebase-functions';

import { UserLikes } from './models/user-likes';
import { LibraryService } from './library.service';

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
      await libraryService.addResourceToLibraryAsync('likes', resourceId, change.after.id, context.timestamp);
    });
  }

  if (removedResourceIds.length) {
    removedResourceIds.forEach(async resourceId => {
      await libraryService.removeResourceFromLibraryAsync('likes', resourceId, change.after.id);
    });
  }
}
