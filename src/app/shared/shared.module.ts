import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material';

import { LoaderService } from './loader/loader.service';
import { LoaderComponent } from './loader/loader.component';
import { SearchService } from './services/search.service';

@NgModule({
    imports: [
        CommonModule,
        MatProgressBarModule
    ],
    declarations: [
        LoaderComponent
    ],
    exports: [
        LoaderComponent
    ],
    providers: [
        LoaderService,
        SearchService,
    ]
})
export class SharedModule { }
