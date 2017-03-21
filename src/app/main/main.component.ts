import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';
import { User } from '../shared/user.model';
import { TdLoadingService } from '@covalent/core';

@Component({
  selector: 'qs-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  routes: Object[] = [{
      title: 'Dashboard',
      route: '/dashboard',
      icon: 'dashboard',
    }
    , {
      title: 'Angular2 Firebase App',
      route: '/firebase',
      icon: 'view_quilt',
    },
    // {
    //   title: 'Angular2 Ngrx App',
    //   route: '/ngrx',
    //   icon: 'view_quilt',
    // },

  ];

  logout(): void {
    this._router.navigate(['/']);
    this._loginServ.logout();
  }

  isLoggedIn: boolean;
  user: User;

  constructor(public _loginServ: LoginService, private _router: Router, private _loadingService: TdLoadingService,) {
    
    this._loginServ.af.auth.subscribe(
      user => this._changeState(user),
      error => console.trace(error)
    );
  }
     isAuth = false;
    authColor = 'warn';
    
      public _changeState(user: any = null) {
        if (user) {
            this.isAuth = true;
            this.authColor = 'primary';
            this.user = this._loginServ._getUserInfo(user)
        }
        else {
            this.isAuth = false;
            this.authColor = 'warn';
            this.user = null;
        }
        //return this.user;
    }

    login(): void {
    this._loadingService.register();
    //alert('Mock log in as ' + this.username);
    this._loginServ.login('google').then(
      //user => this._changeState(user),
      user => { this._loadingService.resolve();
                this._changeState(user);
                console.log(this.user.name);
                this._router.navigate(['/dashboard']);
              },
      error => console.trace(error)
    );
    // setTimeout(() => {
    //   this._router.navigate(['/']);
      
    // }, 2000);
  }

}
