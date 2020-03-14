import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
})
export class BottomNavComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onShowDetails(resourceId) {
    this.router.navigateByUrl('/resources/' + resourceId);
  }
}
