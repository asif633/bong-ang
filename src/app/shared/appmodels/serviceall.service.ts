import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { App } from './app.model';
import { Table } from './table.model';
import { Field } from './field.model';
import { Observable } from 'rxjs/Observable';
import { AppService } from './app.service';
import { LoginService } from '../login.service';
import * as FileSaver from 'file-saver';

@Injectable()
export class ServiceAllService {

    constructor(private http: Http, private appserv: AppService, private loginServ: LoginService) { }
    private commentsUrl = 'http://139.59.64.248:8080/appGenerate';

    postProject() {
        this.appserv.getOne().subscribe(
            res => {
                console.log(res);
                let sev = res;
                console.log("current user "+ this.loginServ.user.uid);
                let bodyString = JSON.stringify(sev); // Stringify payload
                console.log("body "+bodyString);
                const headers = new Headers({
                      'Content-Type': 'application/json'
                });
                //let headers = new Headers({ 'Content-type': 'application/json', 'Accept': 'application/json'}); // ... Set content type to JSON
                //let options = new RequestOptions({ headers: headers }); // Create a request option

                return this.http.post('http://139.59.64.248:8080/appGenerate', bodyString, {headers: headers})
                       .subscribe();
                // ...using post request
                    //.map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                    //.catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

            }
        );
    }

    getDownlod(){
        this.appserv.getOne().subscribe(
            res => {
                console.log(res);
                let sev = res;
                console.log("current user "+ this.loginServ.user.uid);
                let bodyString = JSON.stringify(sev); // Stringify payload
                console.log("body "+bodyString);
                const headers = new Headers({
                      'Content-Type': 'application/json'
                });
                this.download(res);
                //let headers = new Headers({ 'Content-type': 'application/json', 'Accept': 'application/json'}); // ... Set content type to JSON
                //let options = new RequestOptions({ headers: headers }); // Create a request option

                // return this.http.post('http://localhost:8080/downloadApp', bodyString, {headers: headers})
                //         .map(response => {
                //                 console.log(response);       
                //                 var mediaType = 'application/zip';
                //                 var blob = new Blob([response.text()], {type: mediaType});
                //                 var filename = res.appName + '.zip';
                //                 FileSaver.saveAs(blob, filename);//FileSaver.js libray
                //         }).subscribe();
                // ...using post request
                    //.map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                    //.catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

            }
        );
    }

    downloadFile(data: Response){
    var blob = new Blob([data], { type: 'application/zip' });
    var url= window.URL.createObjectURL(blob);
    window.open(url);
}

download(model:App) {
    // Xhr creates new context so we need to create reference to this
    let self = this;
    var pending:boolean = true;

    // Create the Xhr request object
    let xhr = new XMLHttpRequest();

    let url = 'http://139.59.64.248:8080/downloadApp';
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.responseType = 'blob';

    // Xhr callback when we get a result back
    // We are not using arrow function because we need the 'this' context
    xhr.onreadystatechange = function () {

        // We use setTimeout to trigger change detection in Zones
        setTimeout(() => {
            pending = false;
        }, 0);

        // If we get an HTTP status OK (200), save the file using fileSaver
        if (xhr.readyState === 4 && xhr.status === 200) {
            var blob = new Blob([this.response], {type: 'application/zip'});
            FileSaver.saveAs(blob, 'project.zip');
        }
    };

    // Start the Ajax request
    xhr.send(JSON.stringify(model));
}
}