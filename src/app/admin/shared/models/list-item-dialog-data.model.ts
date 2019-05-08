import { ConfirmDialogData } from '@admin/shared/models/confirm-dialog-data';

export class ListItemDialogDataModel<T> extends ConfirmDialogData {
  messageFn?: (item: T) => string;
}
