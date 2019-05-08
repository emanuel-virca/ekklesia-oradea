import * as functions from 'firebase-functions';

import { User } from './models/user.model';
import { NotificationService } from './notification/notification.service';

export async function onUserWriteAsync(
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
  context: functions.EventContext
): Promise<void> {
  const after = change.after.data() as User;
  const before = change.before.data() as User;

  let notificationTokens: string[] = [];
  const afterNotificationTokens = after ? after.notificationTokens || [] : [];
  const beforeNotificationTokens = before ? before.notificationTokens || [] : [];

  if (!beforeNotificationTokens.length) {
    notificationTokens = afterNotificationTokens;
  } else {
    notificationTokens = afterNotificationTokens.filter(x => beforeNotificationTokens.indexOf(x) === -1);
  }

  if (notificationTokens.length) {
    const notificationService = new NotificationService();
    await notificationService.subscribeToTopicAsync(notificationTokens);
  }
}
