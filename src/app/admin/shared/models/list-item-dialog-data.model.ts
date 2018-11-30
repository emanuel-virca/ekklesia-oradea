import { DialogData } from 'src/app/shared/models/dialog-data';

export class ListItemDialogData<T> extends DialogData {
  messageFn?: ((item: T) => string);
}
