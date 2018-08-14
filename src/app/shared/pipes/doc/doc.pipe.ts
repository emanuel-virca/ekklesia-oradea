import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Pipe({
  name: 'doc'
})
export class DocPipe implements PipeTransform {

  constructor(private db: AngularFirestore) {}

  transform<T>(value: any): Observable<T> {
    // TODO any easyer????
    return this.db.doc<T>(value.path).valueChanges();
  }

}
