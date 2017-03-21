import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppServiceNew } from '../../shared/appmodels/app.service-new';
import { App } from '../../shared/appmodels/app.model';

@Component({
  selector: 'app-ngrxapp',
  templateUrl: './ngrxapp.component.html'
})
export class NgrxAppComponent {

    @Input() addOrUpdate: boolean;
    @Input() selApp: App;
    @Output() addSubmit = new EventEmitter<App>();
    @Output() updateSubmit = new EventEmitter<App>();
    @Output() deleteSubmit = new EventEmitter<App>();

    save(){
      this.addSubmit.emit(this.selApp);
      //this.selApp = null;
    }

    update(){
      this.updateSubmit.emit(this.selApp);
      //this.selApp = null;
    }

    delete(){
      this.deleteSubmit.emit(this.selApp);
      //this.selApp = null;
    }
}
