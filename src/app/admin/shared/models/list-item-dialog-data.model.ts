import { DialogData } from '@admin/shared/models/confirm-dialog-data';

export class ListItemDialogDataModel<T> extends DialogData {
  messageFn?: (item: T) => string;
}
