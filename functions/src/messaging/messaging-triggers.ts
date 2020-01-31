import * as functions from 'firebase-functions';

import { MessagingService } from './messaging.service';
import { Messaging } from './messaging';

export async function onMessagingWriteAsync(
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
  context: functions.EventContext
): Promise<void> {
  const after = change.after.data() as Messaging;
  const before = change.before.data() as Messaging;

  let tokens: string[] = [];
  const afterNotificationTokens = after ? after.tokens || [] : [];
  const beforeNotificationTokens = before ? before.tokens || [] : [];

  if (!beforeNotificationTokens.length) {
    tokens = afterNotificationTokens;
  } else {
    tokens = afterNotificationTokens.filter(x => beforeNotificationTokens.indexOf(x) === -1);
  }

  if (tokens.length) {
    const notificationService = new MessagingService();
    await notificationService.subscribeToTopicAsync(tokens);
  }
}
