import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ActionSheetController, Platform, AlertController, LoadingController } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import * as $ from "jquery";

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
  imagens:any;
  racas:any = [];
  cidades:any;
  
  post:any = {
    descricao: '',
    cidade_id: null,
    nome_animal: null,
    tipo_animal: null,
    sexo_animal: null,
    idade_animal: null,
    telefone: this.rest.userData().telefone,
    iswhatsapp: false
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public actionsheetCtrl: ActionSheetController,
    public platform: Platform,
    private camera:Camera,
    private imagePicker: ImagePicker,
    public alertCtrl:AlertController,
    private photoViewer: PhotoViewer,
    public rest: RestProvider,
    public loadingCtrl:LoadingController

  ) {
    this.menuCtrl.enable(false, 'menu-material');
    this.imagens = [];
    console.log(this.racas.length);
  }
  
  ionViewWillLeave()
  {
    this.menuCtrl.enable(true, 'menu-material');
  }

  ionViewWillEnter()
  {
    this.rest.obter_cidades().then(data => this.cidades = data).catch(error => console.log(error));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdicionarPage');
    $(document).ready(function(){
      $('ion-input-mask ion-label').append('<span class="required-star">*</span>');
    });
  }

  popPage()
  {
    this.navCtrl.pop();
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

  visualisarImagem(src)
  {
    this.photoViewer.show(src);
  }

  inserir_post(f)
  {
    f.user_id = this.rest.userData().id;
    f.imagens = this.imagens;
    
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Processando...',
      showBackdrop: true
    });
    

    loading.present().then(() => {
      this.rest.inserir_post(f).then((data) => {
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
          // let alert = this.alertCtrl.create({
          //   title: 'Atenção',
          //   subTitle: data.sucesso,
          //   buttons: ['Ok']
          // });
          // alert.present();
          
          this.navCtrl.pop();
          
        }
      }).catch((error) => { loading.dismiss(); console.log(error); });
    });
  
  }

  inserirImagens() {

    if(this.imagens.length < 5)
    {
      const actionsheet = this.actionsheetCtrl.create({
        title: 'Selecionar Imagens',
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
              this.multipleAlbumPicture();
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
    }else{
      let alert = this.alertCtrl.create({
        title: 'Atenção',
        subTitle: 'A quantidade máxima permitida é de 5 imagens.',
        buttons: ['Ok']
      });
      alert.present();
    }
    
  }

  removerImagem(index)
  {
    var arr = [];
    for(var x=0; x<this.imagens.length; x++)
    {
      if(x != index)
        arr.push(this.imagens[x])
    }
    this.imagens = arr;
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

        
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.imagens.push(imageData);
        //this.imagens_diversas.push(imageData);
        //this.FotoSubmit();
        }, (err) => {
        // Handle error
        });
  }


  multipleAlbumPicture()
  {
    
      let options = {
        maximumImagesCount: 5,
        quality: 50,
        width:1280,
        height:720,
        outputType: 1
      }
        
      this.imagePicker.getPictures(options).then((results) => {
        for (var i = 0; i < results.length; i++) {
            //console.log('Image URI: ' + results[i]);
            if(results[i] != "O" && results[i] != "K")
              this.imagens.push(results[i]);
        }
      }, (err) => { });
  }
   
    preenchido(): boolean
    {
      if(this.imagens.length > 0 || this.post.descricao || this.post.cidade_id ||
        this.post.nome_animal || this.post.tipo_animal || this.post.sexo_animal || this.post.idade_animal) 
        return true
      else
        return false;
    }
    alertarSaida()
    {
      if(this.preenchido())
      {
        let alert = this.alertCtrl.create({
          title: 'Tem certeza?',
          message: 'Todas as informações já preenchidas serão perdidas!',
          buttons: [
            {
              text: 'Cancelar',
              role: 'Cancelar',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Sair',
              handler: () => {
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
      }else{
        this.navCtrl.pop();
      }
    }
  

}
