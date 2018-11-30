import { Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { IListItemBaseModel } from 'src/app/admin/shared/models/list-item-base.model';
import { ListItemDialogData } from './list-item-dialog-data.model';
import { DialogData } from 'src/app/shared/models/dialog-data';

export class ListEvents<T extends IListItemBaseModel> {
  @Output() select = new EventEmitter<T>();
  @Output() initializeNew = new EventEmitter<void>();
  @Output() delete = new EventEmitter<string>();

  constructor(
    public dialog: MatDialog,
    public dialogData: ListItemDialogData<T>
  ) {

  }

  initializeNewItem(): void {
    this.initializeNew.emit();
  }

  selectItem(item: T): void {
    this.select.emit(item);
  }

  deleteItemWithConfirmation(item: T): void {
    if (!item.id) { return; }

    if (!this.dialogData) { throw new Error('confirmConfig was not provided'); }

    const dialogData: DialogData = {
      ...this.dialogData,
      message: this.dialogData.messageFn ? this.dialogData.messageFn(item) : this.dialogData.message,
      confirmText: this.dialogData.confirmText || 'Delete',
    };

    const dialogRef = this.dialog.open(ConfirmModalComponent, { data: dialogData });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.deleteItem(item.id); }
    });
  }

  deleteItem(itemId: string) {
    if (!itemId) { return; }

    this.delete.emit(itemId);
  }
}
