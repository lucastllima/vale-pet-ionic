import { HomePage } from './../home/home';
import { RegistroPage } from './../registro/registro';
import { RestProvider } from './../../providers/rest/rest';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
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

  type1:any = 'password';

  RegistroPage:any = RegistroPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private rest: RestProvider,
    private formBuilder: FormBuilder,
    public loadingCtrl:LoadingController,
    public alertCtrl:AlertController,
    public events: Events
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
        showBackdrop: true
      });
      

      loading.present().then(() => {
        this.rest.login(obj).subscribe( (data) => {
          loading.dismiss();
          this.events.publish('user:created', true, Date.now());
          this.navCtrl.setRoot(HomePage);
        }, (errorResponse: HttpErrorResponse) => {
          loading.dismiss();

          var erro = 'Erro na conexão com o servidor, tente novamente mais tarde.';
          if(errorResponse.error['error']) erro = errorResponse.error['error'];

          let alert = this.alertCtrl.create({
            title: 'Atenção',
            subTitle: erro,
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

  showPassword(input)
  {
      if(this.type1 === 'password')
        this.type1 = 'text';
      else
        this.type1 = 'password'; 
  }
}
