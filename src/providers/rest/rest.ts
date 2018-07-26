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

  public apiUrl = 'http://valepet.connectvalle.com/api/';
  public filesUrl = 'http://valepet.connectvalle.com/uploads/';

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

  atualizar_perfil(dados): Promise<any>
  {
    return new Promise( (resolve, reject) => {
      this.http.post<any>(this.apiUrl+'atualizar-perfil', dados)
      .subscribe((data) =>{
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  atualizar_foto_perfil(dados): Promise<any>
  {
    return new Promise( (resolve, reject) => {
      this.http.post<any>(this.apiUrl+'atualizar-foto-perfil', dados)
      .subscribe((data) =>{
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }
  
  inserir_post(dados): Promise<any>
  {
    return new Promise( (resolve, reject) => {
      this.http.post<any>(this.apiUrl+'inserir-post', dados)
      .subscribe((data) =>{
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  meus_posts(id): Promise<any>
  {
    return new Promise( (resolve, reject) => {
      this.http.get<any>(this.apiUrl+'meus-posts/'+id, {})
      .subscribe((data) =>{
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  posts(): Promise<any>
  {
    return new Promise( (resolve, reject) => {
      this.http.get<any>(this.apiUrl+'posts', {})
      .subscribe((data) =>{
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  alterar_situacao_post(dados): Promise<any>
  {
    return new Promise( (resolve, reject) => {
      this.http.post<any>(this.apiUrl+'alterar-situacao-post/'+dados.id, dados)
      .subscribe((data) =>{
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  remover_post(dados): Promise<any>
  {
    return new Promise( (resolve, reject) => {
      this.http.post<any>(this.apiUrl+'remover-post/'+dados.id, dados)
      .subscribe((data) =>{
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }
  
  atualizar_post(dados): Promise<any>
  {
    return new Promise( (resolve, reject) => {
      this.http.post<any>(this.apiUrl+'atualizar-post/'+dados.id, dados)
      .subscribe((data) =>{
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  obter_racas(dados): Promise<any>
  {
    return new Promise( (resolve, reject) => {
      this.http.get<any>(this.apiUrl+'obter-racas/'+dados.tipo, {})
      .subscribe((data) =>{
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  obter_cidades(): Promise<any>
  {
    return new Promise( (resolve, reject) => {
      this.http.get<any>(this.apiUrl+'obter-cidades', {})
      .subscribe((data) =>{
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  buscar_post(dados): Promise<any>
  {
    return new Promise( (resolve, reject) => {
      this.http.post<any>(this.apiUrl+'buscar-post', dados)
      .subscribe((data) =>{
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }
}
