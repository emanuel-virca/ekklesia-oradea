import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';

export async function onUserWriteAsync(
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
  context: functions.EventContext
): Promise<void> {
  // TODO
}

export async function onAddHistoryAsync(userId, resourceId) {
  const db = admin.firestore();

  const resourceSnippetDocumentSnapp = await db.doc(`resource-snippets/${resourceId}`).get();

  await db
    .collection(`users/${userId}/history`)
    .doc(resourceId)
    .set({ resource: resourceSnippetDocumentSnapp.data(), dateTime: new Date() });
}
