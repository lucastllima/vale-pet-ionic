import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { RequestOptions } from '../../../node_modules/@angular/http';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl = 'http://192.168.100.9:8000/api/';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getUser() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/me').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  userData()
  {
    return JSON.parse(localStorage.getItem('user'));
  }

  login(credentials: {email: string, password: string}): Observable <boolean>
  {
    return this.http.post<any>(this.apiUrl+'login', credentials)
    .do(data => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    });
  }

  logout(): Promise<any>
  {

    return new Promise( (resolve, reject) => {
      this.http.post(this.apiUrl+'logout', {})
      .subscribe((data) =>{
        resolve(data);
      });
    });
    
  }

  registro(dados)
  {
    return this.http.post<any>(this.apiUrl+'registro', dados)
    .do(data => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    });
  }
  

}
