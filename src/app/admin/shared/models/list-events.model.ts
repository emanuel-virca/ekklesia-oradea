import { Output, EventEmitter } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';

import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { IListItemBaseModel } from 'src/app/admin/shared/models/list-item-base.model';
import { ListItemConfirmConfigModel } from './list-item-delete-confirm-cofig.model';

export class ListEvents<T extends IListItemBaseModel> {
  @Output() select = new EventEmitter<T>();
  @Output() initializeNew = new EventEmitter<void>();
  @Output() delete = new EventEmitter<string>();

  constructor(
    public dialog: MatDialog,
    public confirmConfig: ListItemConfirmConfigModel<T>
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

    if (!this.confirmConfig) { throw new Error('must provide config'); }

    const config: MatDialogConfig = {
      data: {
        title: this.confirmConfig.title,
        message: typeof this.confirmConfig.message === 'string' ? this.confirmConfig.message : this.confirmConfig.message(item)
      }
    };

    const dialogRef = this.dialog.open(ConfirmModalComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.deleteItem(item.id); }
    });
  }

  deleteItem(itemId: string) {
    if (!itemId) { return; }

    this.delete.emit(itemId);
  }
}
