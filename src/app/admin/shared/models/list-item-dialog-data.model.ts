import { DialogData } from 'src/app/shared/models/dialog-data';

export class ListItemDialogDataModel<T> extends DialogData {
  messageFn?: ((item: T) => string);
}
