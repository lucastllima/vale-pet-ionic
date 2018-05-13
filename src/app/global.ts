import { Component, OnInit, Injectable } from '@angular/core';

@Injectable()
export class Global {

    public apiURL:string = 'http://localhost:8000/api/';
    public filesURL:string = 'http://localhost:8000/uploads/';

}