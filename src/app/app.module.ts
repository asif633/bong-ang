import { NgModule, Type } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';

import { CovalentCoreModule } from '@covalent/core';
import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentChartsModule } from '@covalent/charts';
import { CovalentDataTableModule } from '@covalent/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { LoginComponent } from './login/login.component';
import { TemplatesComponent } from './templates/templates.component';
import { appRoutes, appRoutingProviders } from './app.routes';
import { LoginService } from './shared/login.service';
import { AuthGuard } from './shared/authguard.service';

import { ChartComponent } from '../components/chart/chart.component';

import { RequestInterceptor } from '../config/interceptors/request.interceptor';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FirebaseComponent } from './firebase/firebase.component';
import { FirebaseInfoComponent } from './firebase/firebase-info/firebase-info.component';
import { FirebaseModelsComponent } from './firebase/firebase-models/firebase-models.component';
import { FirebaseWidgetsComponent } from './firebase/firebase-widgets/firebase-widgets.component';
import { FirebaseModelComponent } from './firebase/firebase-model/firebase-model.component';
import { ServiceAllService } from './shared/appmodels/serviceall.service';
import { FirebaseFieldsComponent } from './firebase/firebase-fields/firebase-fields.component';
import { FirebaseFieldComponent } from './firebase/firebase-field/firebase-field.component';
import { TableService, tables, selectedTable } from './shared/appmodels/table.service';
import { TableServiceNew, tablesNew, selectedTableNew } from './shared/appmodels/table.service-new';
import { AppService, apps, selectedApp } from './shared/appmodels/app.service';
import { AppServiceNew, appsNew, selectedAppNew } from './shared/appmodels/app.service-new';
import { fields, selectedField, FieldService } from './shared/appmodels/field.service';
import { FieldServiceNew, fieldsNew, selectedFieldNew } from './shared/appmodels/field.service-new';
import { NgrxModule } from './ngrx/ngrx.module';

const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];

export const fireConfig = {
    apiKey: "AIzaSyCX7sOLGL_kwV08tSLI8lmf_GXj6NA_QEU",
    authDomain: "bong-angular.firebaseapp.com",
    databaseURL: "https://bong-angular.firebaseio.com",
    storageBucket: "bong-angular.appspot.com",
    messagingSenderId: "831040859922"
  };

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DashboardComponent,
    LoginComponent,
    ChartComponent,
    TemplatesComponent,
    FirebaseComponent,
    FirebaseInfoComponent,
    FirebaseModelsComponent,
    FirebaseWidgetsComponent,
    FirebaseModelComponent,
    FirebaseFieldsComponent,
    FirebaseFieldComponent,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    BrowserModule,
    CovalentCoreModule.forRoot(),
    CovalentChartsModule.forRoot(),
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
    CovalentHighlightModule.forRoot(),
    CovalentMarkdownModule.forRoot(),
    appRoutes,
    NgxChartsModule,
    CovalentDataTableModule.forRoot(),
    AngularFireModule.initializeApp(fireConfig, myFirebaseAuthConfig),
    StoreModule.provideStore({
      apps, selectedApp, tables, selectedTable, fields, selectedField,
      appsNew, selectedAppNew, tablesNew, selectedTableNew, fieldsNew, selectedFieldNew
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    NgrxModule,
    
  ], // modules needed to run this module
  providers: [
    appRoutingProviders,
    httpInterceptorProviders,
    Title,
    LoginService,
    AuthGuard,
    ServiceAllService,
    TableService,
    AppService,
    FieldService,
    AppServiceNew,
    TableServiceNew,
    FieldServiceNew,
  ], // additional providers needed for this module
  entryComponents: [ ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
