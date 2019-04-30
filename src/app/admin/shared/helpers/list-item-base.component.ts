import { Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { IListItemBaseModel } from '../models/list-item-base.model';
import { ListItemDialogDataModel } from '../models/list-item-dialog-data.model';
import { DialogData } from '../models/dialog-data';
import { ConfirmModalComponent } from '@admin/shared/components/confirm-modal/confirm-modal.component';

export class ListItemBaseComponent<T extends IListItemBaseModel> {
  @Output() create = new EventEmitter<T>();
  @Output() update = new EventEmitter<T>();
  @Output() delete = new EventEmitter<string>();
  @Output() clearSelected = new EventEmitter<void>();

  constructor(public dialog: MatDialog, public dialogData: ListItemDialogDataModel<T>) {}

  createItem(item: T) {
    this.create.emit(item);
  }

  updateItem(item: T) {
    this.update.emit(item);
  }

  clearSelectedItem(): void {
    this.clearSelected.emit();
  }

  deleteItem(itemId: string) {
    if (!itemId) {
      return;
    }

    this.delete.emit(itemId);
  }

  deleteItemWithConfirmation(item: T): void {
    if (!item.id) {
      return;
    }

    if (!this.dialogData) {
      throw new Error('confirmConfig was not provided');
    }

    const dialogData: DialogData = {
      ...this.dialogData,
      message: this.dialogData.messageFn ? this.dialogData.messageFn(item) : this.dialogData.message,
      confirmText: this.dialogData.confirmText || 'Delete',
    };

    const dialogRef = this.dialog.open(ConfirmModalComponent, { data: dialogData });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem(item.id);
      }
    });
  }
}
