import * as functions from 'firebase-functions';

import { UserService } from './user.service';
import { ResourceService } from './resource.service';

export async function onUserWriteAsync(
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
  context: functions.EventContext
): Promise<void> {
  // TODO
}

export async function onAddHistoryAsync(userId, resourceId) {
  const userService = new UserService();
  await userService.addHistoryAsync(userId, resourceId);

  const resourceService = new ResourceService();
  await resourceService.incrementViewsAsync(resourceId);
}
