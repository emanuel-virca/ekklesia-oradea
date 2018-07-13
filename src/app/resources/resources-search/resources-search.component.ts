import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SearchService } from '../../shared/services/search.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ResourceSearchResult } from '../../shared/models/resource-search-result.model';
import { Router } from '@angular/router';


@Component({
    selector: 'app-resources-search',
    templateUrl: './resources-search.component.html',
    styleUrls: ['./resources-search.component.css']
})
export class ResourcesSearchComponent implements OnInit {
    searchCtrl: FormControl;
    searchResults: Array<ResourceSearchResult>;

    constructor(private searchService: SearchService, private router: Router) {
        this.searchCtrl = new FormControl();
    }

    ngOnInit() {
        this.searchCtrl.valueChanges.subscribe(async (x) => {
            this.searchResults = await this.searchService.searchResourcesAsync(x, 0, 100);
        });
    }

    optionSelected($event: MatAutocompleteSelectedEvent) {
        // TODO open resource
        this.router.navigate(['../resources/results', { search_query: $event.option.value }]);
    }

    search() {
        this.router.navigate(['../resources/results', { search_query: this.searchCtrl.value }]);
    }
}
