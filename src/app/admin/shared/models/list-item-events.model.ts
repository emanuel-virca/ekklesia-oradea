import { Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { IListItemBaseModel } from 'src/app/admin/shared/models/list-item-base.model';
import { ListEvents } from './list-events.model';
import { ListItemDialogData } from './list-item-dialog-data.model';

export class ListItemEvents<T extends IListItemBaseModel> extends ListEvents<T> {
  @Output() create = new EventEmitter<T>();
  @Output() update = new EventEmitter<T>();
  @Output() delete = new EventEmitter<string>();
  @Output() clearSelected = new EventEmitter<void>();

  constructor(
    public dialog: MatDialog,
    public dialogData: ListItemDialogData<T>
  ) {
    super(dialog, dialogData);
  }

  createItem(item: T) {
    this.create.emit(item);
  }

  updateItem(item: T) {
    this.update.emit(item);
  }

  clearSelectedItem(): void {
    this.clearSelected.emit();
  }
}
