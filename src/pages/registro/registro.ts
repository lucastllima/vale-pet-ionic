import { HomePage } from './../home/home';
import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '../../../node_modules/@angular/forms';
import { HttpErrorResponse } from '../../../node_modules/@angular/common/http';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  errorEmail:any;
  messageEmail:any;

  errorName:any;
  messageName:any;

  errorPassword:any;
  messagePassword:any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private rest: RestProvider,
    private formBuilder: FormBuilder,
    public loadingCtrl:LoadingController,
    public alertCtrl:AlertController
  ) 
  {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }


  registro(f)
  {
    if(f.password != f.password_confirmation)
    {
      let alert = this.alertCtrl.create({
        title: 'Atenção',
        subTitle: 'As senhas estão divergindo.',
        buttons: ['Ok']
      });
      alert.present();
    }else{
      let loading = this.loadingCtrl.create({
        spinner: 'crescent',
        content: 'Processando...',
        showBackdrop: false
      });
      

      loading.present().then(() => {
        this.rest.registro(f).subscribe( (data) => {
          loading.dismiss();

          this.navCtrl.setRoot(HomePage);
        }, (errorResponse) => {
          loading.dismiss();

          let alert = this.alertCtrl.create({
            title: 'Atenção',
            subTitle: errorResponse.error['error'],
            buttons: ['Ok']
          });
          alert.present();
          
        });
      });
    }
  }

}
