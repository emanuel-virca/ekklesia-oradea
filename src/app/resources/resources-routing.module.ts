import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ResourcesListComponent } from './resources-list/resources-list.component';

const routes: Routes = [
    { path: '', component: ResourcesListComponent },
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [],
})
export class ResourcesRoutingModule {

}
