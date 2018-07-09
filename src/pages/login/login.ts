import { HomePage } from './../home/home';
import { RegistroPage } from './../registro/registro';
import { RestProvider } from './../../providers/rest/rest';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '../../../node_modules/@angular/forms';
import { HttpErrorResponse } from '../../../node_modules/@angular/common/http';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage{

  errorEmail:any;
  messageEmail:any;

  errorPassword:any;
  messagePassword:any;

  RegistroPage:any = RegistroPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private rest: RestProvider,
    private formBuilder: FormBuilder,
    public loadingCtrl:LoadingController,
    public alertCtrl:AlertController
  ) {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(f)
  {
    let obj = {
      email: f.email,
      password: f.password,
    }

      
      this.errorPassword = false;
      this.errorEmail = false;
      
      let loading = this.loadingCtrl.create({
        spinner: 'crescent',
        content: 'Processando...',
        showBackdrop: false
      });
      

      loading.present().then(() => {
        this.rest.login(obj).subscribe( (data) => {
          loading.dismiss();

          this.navCtrl.setRoot(HomePage);
        }, (errorResponse: HttpErrorResponse) => {
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

  facebookLogin()
  {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: 'Login com o facebook ainda não está pronto...',
      buttons: ['Ok']
    });
    alert.present();
  }

}