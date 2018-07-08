import { RestProvider } from './../../providers/rest/rest';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  f: FormGroup;
  errorEmail:any;
  messageEmail:any;

  errorPassword:any;
  messagePassword:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private rest: RestProvider,
    private formBuilder: FormBuilder
  ) {
    this.f = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([
        Validators.minLength(6), Validators.maxLength(20), Validators.required
      ])]
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login()
  {
    let {email, password} = this.f.controls;
    
    if(!this.f.valid)
    {
        if(!email.valid)
        {
          this.errorEmail = true;
          this.messageEmail = 'O campo e-mail é obrigatório!';
        }else{
          this.messageEmail = '';
        }

        if(!password.valid)
        {
          this.errorPassword = true;
          this.messagePassword = 'A senha precisa ter de 6 a 20 caracteres!';
        }else{
          this.messagePassword = '';
        }
    }else {
      this.errorPassword = false;
      this.errorEmail = false;
      
      this.rest.login(this.f.value).subscribe( (data) => {
        console.log(data);
        alert(data);
      }, (errorResponse: HttpErrorResponse) => {
        
          console.log((errorResponse.error['error']));
        
      });
    }
  }

}
