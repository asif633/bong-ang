import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/appmodels/app.service';
import { TableService, tables } from '../shared/appmodels/table.service';
import { FieldService } from '../shared/appmodels/field.service';
import { App } from '../shared/appmodels/app.model';
import { Table } from '../shared/appmodels/table.model';
import { ServiceAllService } from '../shared/appmodels/serviceall.service';

@Component({
  selector: 'app-firebase',
  templateUrl: './firebase.component.html',
  styleUrls: ['./firebase.component.scss']
})
export class FirebaseComponent implements OnInit {

  constructor(private appServ: AppService, private tableServ: TableService, private fieldServ: FieldService, private allServ: ServiceAllService) { }
  
  selIndex: number;
  modelDisable: boolean;
  widgetsDisable: boolean;

  ngOnInit() {
    this.selIndex = 0;
    this.modelDisable = true;
    this.widgetsDisable = true;
  }

  getIndex(event){
    this.selIndex = event;
  }

  enableModel(event){
    this.modelDisable = event;
  }

  enableWidgets(event){
    this.widgetsDisable = event;
  }

  jsonVal: string;
  
  generateJson(){
   this.allServ.postProject();
  
  }

  downloadItem(){
   this.allServ.getDownlod();
  }

}
