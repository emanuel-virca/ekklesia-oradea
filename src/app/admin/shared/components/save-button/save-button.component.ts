import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss'],
})
export class SaveButtonComponent implements OnInit {
  @Input() formGroup: FormGroup;

  @Output() save = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public onClick($event: any) {
    $event.stopImmediatePropagation();

    if (!this.formGroup.dirty || !this.formGroup.valid) {
      return;
    }

    this.save.emit('');
  }
}
