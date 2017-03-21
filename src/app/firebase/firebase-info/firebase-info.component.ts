import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { App } from '../../shared/appmodels/app.model';
import { AppService } from '../../shared/appmodels/app.service';

@Component({
  selector: 'app-firebase-info',
  templateUrl: './firebase-info.component.html',
  styleUrls: ['./firebase-info.component.scss']
})
export class FirebaseInfoComponent implements OnInit {

  constructor(private appServ: AppService) { }
  
  @Output() public changeIndex = new EventEmitter<number>(); 
  @Output() public modelEnable = new EventEmitter<boolean>();

  cssFrameworks: string[];
  colors: string[];
  hues: string[];

  ngOnInit() {
   this.appInfo = this.appServ.initializeApp();
   this.appServ.dispatchAdd(this.appInfo);
   this.cssFrameworks = ['material']
   this.colors = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 
                  'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey'
                 ];
   this.hues = [ '50', '100', '200', '300', '400', '500', '600', '700', '800', '900' , 'A100', 'A200', 'A400', 'A700'];
 
}
  
  appInfo: App;

  submit(){
    this.appServ.dispatchUpdate(this.appInfo);
    this.changeIndex.emit(1);
    this.modelEnable.emit(false);
  }

}
