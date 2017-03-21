import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CovalentCoreModule } from '@covalent/core';
import { CovalentDataTableModule } from '@covalent/core';

import { NgrxContentComponent } from './ngrxcontent.component';
import { NgrxAppComponent } from './app/ngrxapp.component';
import { NgrxAppsComponent } from './apps/ngrxapps.component';
import { NgrxAppContentComponent } from './appcontent/ngrxappcontent.component';
import { NgrxTableComponent } from './table/ngrxtable.component';
import { NgrxTablesComponent } from './tables/ngrxtables.component';
import { NgrxTableContentComponent } from './tablecontent/ngrxtablecontent.component';
import { NgrxFieldComponent } from './field/ngrxfield.component';
import { NgrxFieldsComponent } from './fields/ngrxfields.component';
import { NgrxFieldContentComponent } from './fieldcontent/ngrxfieldcontent.component';

import { AppServiceNew } from '../shared/appmodels/app.service-new';
import { TableServiceNew } from '../shared/appmodels/table.service-new';
import { FieldServiceNew } from '../shared/appmodels/field.service-new';

@NgModule({
    imports: [
        CommonModule,
        CovalentCoreModule.forRoot(),
        CovalentDataTableModule.forRoot(),
    ],
    declarations: [
        NgrxContentComponent,
        NgrxAppComponent,
        NgrxAppsComponent,
        NgrxAppContentComponent,
        NgrxTableComponent,
        NgrxTablesComponent,
        NgrxTableContentComponent,
        NgrxFieldComponent,
        NgrxFieldsComponent,
        NgrxFieldContentComponent
    ],
    providers: [
        AppServiceNew,
        TableServiceNew,
        FieldServiceNew
    ],
    exports: [NgrxContentComponent]
})
export class NgrxModule { }