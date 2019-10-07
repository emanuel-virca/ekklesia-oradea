import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material';
import { startWith } from 'rxjs/operators';

import { SearchService } from '@web-portal/core/services/search/search.service';
import { ResourceSearchResult } from '@web-portal/shared/models/resource-search-result';

@Component({
  selector: 'app-resources-search',
  templateUrl: './resources-search.component.html',
  styleUrls: ['./resources-search.component.scss'],
})
export class ResourcesSearchComponent implements OnInit, AfterViewInit {
  searchCtrl: FormControl = new FormControl();
  searchResults: Array<ResourceSearchResult>;
  showAutocompletePanel: boolean;
  showSearch = false;

  @ViewChild(MatAutocompleteTrigger, { static: true })
  matAutocompleteTrigger: MatAutocompleteTrigger;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef<HTMLInputElement>;

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit() {
    this.searchCtrl.valueChanges.pipe(startWith('')).subscribe(async x => {
      this.searchResults = await this.searchService.searchResourcesAsync(x, 0, 5);
    });
  }

  ngAfterViewInit(): void {}

  optionSelected($event: MatAutocompleteSelectedEvent) {
    this.router.navigate(['../resources/results', { search_query: $event.option.value }]);
  }

  search() {
    this.matAutocompleteTrigger.closePanel();
    this.router.navigate(['../resources/results', { search_query: this.searchCtrl.value }]);
  }

  clearSearch() {
    this.searchCtrl.setValue(null);
    this.searchInput.nativeElement.focus();
  }

  startSearch() {
    this.showSearch = true;
    setTimeout(() => this.searchInput.nativeElement.focus(), 150);
  }

  stopSearch() {
    this.showSearch = false;
  }
}
