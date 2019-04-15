import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-web-portal',
  templateUrl: './web-portal.component.html',
  styleUrls: ['./web-portal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebPortalComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
