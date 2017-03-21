import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TdLoadingService } from '@covalent/core';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'qs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  username: string;
  password: string;


  constructor(private _router: Router,
              private _loadingService: TdLoadingService, private _loginServ: LoginService) {}

  login(): void {
    this._loadingService.register();
    //alert('Mock log in as ' + this.username);
    this._loginServ.login('google').then(
      //user => this._changeState(user),
      user => { this._loadingService.resolve();
                this._router.navigate(['/']);
              },
      error => console.trace(error)
    );
    // setTimeout(() => {
    //   this._router.navigate(['/']);
      
    // }, 2000);
  }

}
