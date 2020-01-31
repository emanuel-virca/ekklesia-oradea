import * as functions from 'firebase-functions';

export async function onUserWriteAsync(
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
  context: functions.EventContext
): Promise<void> {
  // TODO
}
