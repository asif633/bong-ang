import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _loginServ: LoginService, 
                private router: Router) {}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._loginServ.af.auth.map((auth) => {
        if (!auth) {
          this.router.navigateByUrl('/');
          return false;
        }
        return true;
    }).take(1);
  }
}