import { DocumentSnapshot, Action, DocumentChangeAction } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

export const mapItemWithId = map((a: Action<DocumentSnapshot<any>>) => {
    const data = a.payload.data();
    const id = a.payload.id;
    return { id, ...data };
});

export const mapArrayWithId = map((changes: DocumentChangeAction<any>[]) =>
    changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
);
