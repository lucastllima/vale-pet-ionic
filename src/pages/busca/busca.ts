import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the BuscaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-busca',
  templateUrl: 'busca.html',
})
export class BuscaPage {

  busca:any= {
    tipo_animal: null,
    sexo_animal: null,
    idade_animal: null,
  };

  racas:any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public rest: RestProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscaPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  obterRacas(tipo)
  {
    let obj = {tipo: tipo};
    this.racas = [];
    this.rest.obter_racas(obj).then((data) => {
      this.racas = data;
    }).catch(() => {

    });
  }

  buscar(f)
  {
    this.viewCtrl.dismiss({'pesquisa': f});
    // this.navParams.data({'pesquisa': f});
  }

}
