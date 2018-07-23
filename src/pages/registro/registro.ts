import { HomePage } from './../home/home';
import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
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

  type1:any = 'password';
  type2:any = 'password';
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private rest: RestProvider,
    private formBuilder: FormBuilder,
    public loadingCtrl:LoadingController,
    public alertCtrl:AlertController,
    public events: Events
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
        showBackdrop: true
      });
      

      loading.present().then(() => {
        this.rest.registro(f).subscribe( (data) => {
          loading.dismiss();
          this.events.publish('user:created', true, Date.now());
          this.navCtrl.setRoot(HomePage);
        }, (errorResponse) => {
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
  }

  showPassword(input)
  {
    if(input == 1)
    {
      if(this.type1 === 'password')
        this.type1 = 'text';
      else
        this.type1 = 'password';
    }else{
      if(this.type2 === 'password')
        this.type2 = 'text';
      else
        this.type2 = 'password';
    }
    
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
