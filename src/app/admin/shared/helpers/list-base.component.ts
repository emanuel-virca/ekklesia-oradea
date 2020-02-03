import { Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { IListItemBaseModel } from '@admin/shared/models/list-item-base.model';
import { ListItemDialogDataModel } from '../models/list-item-dialog-data.model';
import { ListItemBaseComponent } from './list-item-base.component';

export class ListBaseComponent<T extends IListItemBaseModel> extends ListItemBaseComponent<T> {
  @Output() selectItem = new EventEmitter<T>();
  @Output() initializeNew = new EventEmitter<void>();
  @Output() delete = new EventEmitter<string>();

  constructor(public dialog: MatDialog, public dialogData: ListItemDialogDataModel<T>) {
    super(dialog, dialogData);
  }

  initializeNewItem(): void {
    this.initializeNew.emit();
  }

  onSelectItem(item: T): void {
    this.selectItem.emit(item);
  }
}
