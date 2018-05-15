import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
  ) {
    this.menuCtrl.enable(false, 'menu-material');
  }

  ionViewWillLeave()
  {
    this.menuCtrl.enable(true, 'menu-material');
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

}
