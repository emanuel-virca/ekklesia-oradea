import { Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { IBaseModel } from 'src/app/shared/models/base.model';
import { ListEvents } from './list-events.model';
import { ListItemConfirmConfigModel } from './list-item-delete-confirm-cofig.model';

export class ListItemEvents<T extends IBaseModel> extends ListEvents<T> {
  @Output() create = new EventEmitter<T>();
  @Output() update = new EventEmitter<T>();
  @Output() delete = new EventEmitter<string>();
  @Output() clearSelected = new EventEmitter<void>();

  constructor(
    public dialog: MatDialog,
    public confirmModalConfig: ListItemConfirmConfigModel<T>
  ) {
    super(dialog, confirmModalConfig);
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
