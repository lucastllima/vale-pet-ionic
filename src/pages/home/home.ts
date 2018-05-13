import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Global } from '../../app/global';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  postagens:any = [];

  constructor(
    public navCtrl: NavController,
    public global: Global,
  ) {

  }

}
