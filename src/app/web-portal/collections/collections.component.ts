import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionsComponent {
  navigationItems: { icon?: string; name: string; routerLink: string }[] = [
    {
      name: 'Liked',
      routerLink: 'likes',
    },
  ];
}
