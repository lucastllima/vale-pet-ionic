import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';

/**
 * Generated class for the AdicionarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-adicionar',
  templateUrl: 'adicionar.html',
})
export class AdicionarPage {

  PerfilPage:any = PerfilPage;

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
    console.log('ionViewDidLoad AdicionarPage');
  }

  popPage()
  {
    this.navCtrl.pop();
  }
}
