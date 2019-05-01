import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  navigationItems: { icon: string; name: string; routerLink: string }[] = [
    {
      name: 'Resources',
      icon: 'perm_media',
      routerLink: 'resources',
    },
    {
      name: 'Authors',
      icon: 'people',
      routerLink: 'authors',
    },
    {
      name: 'Web Portal',
      icon: 'apps',
      routerLink: '',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
