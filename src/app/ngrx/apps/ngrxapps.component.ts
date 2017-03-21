import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core';
import { ITdDataTableSelectEvent } from '@covalent/core';
import { Observable } from 'rxjs/Observable';
import { App } from '../../shared/appmodels/app.model';

@Component({
  selector: 'app-ngrxapps',
  templateUrl: './ngrxapps.component.html'
})
export class NgrxAppsComponent implements OnInit {

  columns: ITdDataTableColumn[];
  @Input() data: App[];

  ngOnInit() {
    this.columns = [
      { name: 'appName',  label: 'Name' },
    ];
  }

  @Output() selectedApp = new EventEmitter<App>();
  @Output() addUpdate = new EventEmitter<boolean>();

  selectEvent(event:ITdDataTableSelectEvent){
    if(event.selected){
      this.selectedApp.emit(event.row);
      this.addUpdate.emit(false);
    }
    else{
      this.selectedApp.emit(null);
    } 
  }

  addNew(){
    this.addUpdate.emit(true);
  }

}
