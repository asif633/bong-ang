import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { User } from './user.model';
import { AppService } from './appmodels/app.service';
import { TableService } from './appmodels/table.service';
import { FieldService } from './appmodels/field.service';

@Injectable()
export class LoginService {

    constructor(public af: AngularFire, private appserv: AppService, private tableServ: TableService,private fieldServ: FieldService) { 
    af.auth.subscribe(
      user => this._changeState(user),
      error => console.trace(error)
    );
    }

    public _getUserInfo(user: any): any {
        if (!user) {
            return {};
        }
        let data = user.auth.providerData[0];
        return {
            uid: data.uid,
            name: data.displayName,
            avatar: data.photoURL,
            email: data.email,
            provider: data.providerId
        };
    }

    private _getProvider(from: string) {
        switch (from) {
            case 'twitter': return AuthProviders.Twitter;
            case 'facebook': return AuthProviders.Facebook;
            case 'github': return AuthProviders.Github;
            case 'google': return AuthProviders.Google;
        }
    }

    login(from: string) {
        return this.af.auth.login({
            provider: this._getProvider(from)
        });
    }

    logout() {
        this.af.auth.logout().then(res => {
            this.appserv.loadApp([]);
            this.appserv.selectApp(null);
            this.tableServ.loadTables([]);
            this.tableServ.selectTable(null);
            this.fieldServ.loadFields([]);
            this.fieldServ.selectField(null);
        });

    }

    isAuth = false;
    authColor = 'warn';
    user : User;

    public _changeState(user: any = null) {
        if (user) {
            this.isAuth = true;
            this.authColor = 'primary';
            this.user = this._getUserInfo(user)
        }
        else {
            this.isAuth = false;
            this.authColor = 'warn';
            this.user = {};
        }
        return this.user;
    }
    
}