import { CameraOptions, Camera } from '@ionic-native/camera';
import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ActionSheetController, Platform, LoadingController, IonicModule, AlertController } from 'ionic-angular';
import * as $ from "jquery";
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

  user:any;

  type1:any = 'password';
  type2:any = 'password';
  avatar:any;
  loading:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public rest: RestProvider,
    private camera: Camera,
    public actionsheetCtrl: ActionSheetController,
    public platform: Platform,
    public loadingCtrl:LoadingController,
    public alertCtrl: AlertController
  ) {
    this.menuCtrl.enable(false, 'menu-material');

    this.user = {
      name: rest.userData().name,
      email: rest.userData().email,
      telefone: rest.userData().telefone,
    }

    

  }

  ionViewWillLeave()
  {
    this.menuCtrl.enable(true, 'menu-material');
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  atualizar_perfil(f)
  {
    f.id = this.rest.userData().id;
    console.log(f);

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Processando...',
      showBackdrop: true
    });

    loading.present().then(() => {
      this.rest.atualizar_perfil(f).then((data) =>{
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
            subTitle: 'Perfil atualizado com sucesso!',
            buttons: ['Ok']
          });
  
          alert.present();

          localStorage.setItem('user', JSON.stringify(data.user));
        }
      }).catch((error) => { loading.dismiss(); console.log(error); });
    });
  }

  submitFoto()
  {
    var dados = {
      id: this.rest.userData().id,
      avatar: this.avatar   
    }

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Processando...',
      showBackdrop: true
    });

    loading.present().then(() => {
      this.rest.atualizar_foto_perfil(dados).then((data) =>{
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
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        
      }).catch((error) => { loading.dismiss(); console.log(error); });
    });
    

  }

  alterarFoto()
  {
    const actionsheet = this.actionsheetCtrl.create({
      title: 'Alterar Foto',
      buttons: [
        {
          text: 'Câmera',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Galeria',//!this.platform.is('ios') ? 'gallery' : 'camera roll',
          icon: !this.platform.is('ios') ? 'image' : null,
          handler: () => {
            this.albumPicture();
          }
        },
        {
          text: 'Cancelar',
          icon: !this.platform.is('ios') ? 'close' : null,
          role: 'destructive',
          handler: () => {
            console.log('Usuário cancelou.');
          }
        }
      ]
    });
    return actionsheet.present();
  }

  takePicture()
  {
      const options: CameraOptions = {
          
          quality: 50,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          allowEdit: true,
          correctOrientation: true,
          //sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        }
        
        this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        //let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.avatar = imageData;
        //this.imagens_diversas.push(imageData);
        this.submitFoto();
        }, (err) => {
        // Handle error
        });
  }

  albumPicture()
  {
      const options: CameraOptions = {
          quality: 50,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          allowEdit: true,
          correctOrientation: true,
          sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        }
        
        this.camera.getPicture(options).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64:
          //let base64Image = 'data:image/jpeg;base64,' + imageData;
          this.avatar = imageData;
          this.submitFoto();
        }, (err) => {
          // Handle error
        });
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

}
