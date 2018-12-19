import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material';

import { ResourceSearchResult } from './resource-search-result.model';
import { SearchService } from 'src/app/core/services/search/search.service';


@Component({
    selector: 'app-resources-search',
    templateUrl: './resources-search.component.html',
    styleUrls: ['./resources-search.component.scss']
})
export class ResourcesSearchComponent implements OnInit, AfterViewInit {
    searchCtrl: FormControl;
    searchResults: Array<ResourceSearchResult>;
    showAutocompletePanel: boolean;

    @ViewChild('matAutocompleteTrigger', { read: MatAutocompleteTrigger }) matAutocompleteTrigger: MatAutocompleteTrigger;
    @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

    constructor(private searchService: SearchService, private router: Router) {
        this.searchCtrl = new FormControl();
    }

    ngOnInit() {
        this.searchCtrl.valueChanges.subscribe(async (x) => {
            this.searchResults = await this.searchService.searchResourcesAsync(x, 0, 100);
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => this.searchInput.nativeElement.focus());
    }

    optionSelected($event: MatAutocompleteSelectedEvent) {
        // TODO open resource
        this.router.navigate(['../resources/results', { search_query: $event.option.value }]);
    }

    search() {
        this.matAutocompleteTrigger.closePanel();
        this.router.navigate(['../resources/results', { search_query: this.searchCtrl.value }]);
    }
}
