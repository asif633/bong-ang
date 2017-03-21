import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FirebaseComponent } from './firebase/firebase.component';
import { LoginComponent } from './login/login.component';
import { TemplatesComponent } from './templates/templates.component';
import { AuthGuard } from './shared/authguard.service';
import { NgrxContentComponent } from './ngrx/ngrxcontent.component'; 

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: MainComponent, children: [
    
    {component: DashboardComponent, path: 'dashboard', canActivate: [AuthGuard]},
    {path:'firebase', component: FirebaseComponent, canActivate: [AuthGuard]},
    {path:'ngrx', component: NgrxContentComponent},
    {path: '', children: [
      {path: '', component: TemplatesComponent},
    ]},
  ]},
];

export const appRoutingProviders: any[] = [

];

export const appRoutes: any = RouterModule.forRoot(routes, { useHash: false });
