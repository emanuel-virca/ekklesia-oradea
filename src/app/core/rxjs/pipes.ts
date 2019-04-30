import { DocumentSnapshot, Action, DocumentChangeAction } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export const mapItemWithId = map((a: Action<DocumentSnapshot<any>>) => {
  const data = a.payload.data();
  const id = a.payload.id;
  return { id, ...data };
});

export const mapArrayWithId = map((changes: DocumentChangeAction<any>[]) =>
  changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
);

export const mappItemWithReference = map((changes: DocumentChangeAction<any>[]) =>
  changes.map(a => ({ ref: a.payload.doc.ref, ...a.payload.doc.data() }))
);
