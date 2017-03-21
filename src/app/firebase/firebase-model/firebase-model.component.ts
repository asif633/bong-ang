import { Component, OnInit, Input } from '@angular/core';
import { Table } from '../../shared/appmodels/table.model';
import { TableService } from '../../shared/appmodels/table.service';
import { AppService } from '../../shared/appmodels/app.service';
import { App } from '../../shared/appmodels/app.model';

@Component({
  selector: 'app-firebase-model',
  templateUrl: './firebase-model.component.html',
  styleUrls: ['./firebase-model.component.scss']
})
export class FirebaseModelComponent implements OnInit {
   @Input() selModel: Table;
   
  constructor(private tabServ: TableService, private appserv: AppService) { }

  ngOnInit() {
    this.appserv.getOne().subscribe(res => this.selApp = res);
  }
  selApp: App;

  submit(){
    this.selModel.nameLowercase = this.selModel.name.toLowerCase();
    this.tabServ.dispatchUpdate(this.selModel);
    this.selApp.tables.push(this.selModel);
  }

  

}
