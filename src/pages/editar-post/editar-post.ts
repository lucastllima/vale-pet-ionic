import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import * as $ from "jquery";

/**
 * Generated class for the EditarPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-editar-post',
  templateUrl: 'editar-post.html',
})
export class EditarPostPage {

  post:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public rest: RestProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.post = this.navParams.get('item');
    //console.log(this.post);
  }

  ionViewDidLoad() 
  {
    $(document).ready(function(){
      $('ion-input-mask ion-label').append('<span class="required-star">*</span>');
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  editar_post(f)
  {
    
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Processando...',
      showBackdrop: true
    });
    f.id = this.post.id;
    

    loading.present().then(() => {
      this.rest.atualizar_post(f).then((data) => {
        loading.dismiss();
        if(data.error)
        {
          let alert = this.alertCtrl.create({
            title: 'Atenção',
            subTitle: data.error,
            buttons: ['Ok']
          });
          alert.present();
        }else{
          let alert = this.alertCtrl.create({
            title: 'Sucesso',
            subTitle: data.sucesso,
            buttons: ['Ok']
          });
          alert.present();

          this.dismiss();
          
        }
      }).catch((error) => { loading.dismiss(); console.log(error); });
    });
  
  }

}
