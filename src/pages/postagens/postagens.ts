import { EditarPostPage } from './../editar-post/editar-post';
import { AdicionarPage } from './../adicionar/adicionar';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ActionSheetController, Platform, AlertController, ModalController, MenuController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the PostagensPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-postagens',
  templateUrl: 'postagens.html',
})
export class PostagensPage {

  postagens:any;
  AdicionarPage:any = AdicionarPage;
  EditarPostPage:any = EditarPostPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(false, 'menu-material');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostagensPage');
    this.obterPosts();
  }
  
  ionViewWillLeave()
  {
    this.menuCtrl.enable(true, 'menu-material');
  }

  obterPosts()
  {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Processando...',
      showBackdrop: true
    });
    
    // let dados = {
    //   id: this.rest.userData().id
    // };

    loading.present().then(() => {
      this.rest.meus_posts( this.rest.userData().id ).then((data) => {
        loading.dismiss();
        this.postagens = data;
        console.log
      }).catch((error) => { loading.dismiss(); console.log(error); });
    });
  }

  abrirOpcoes(item)
  {
    console.log(item);
    
    var text_adotado = 'Definir como adotado';
    var icon_adotado = 'thumbs-up';
    var dados = {
      situacao: item.situacao,
      id: item.id,
      user_id: this.rest.userData().id
    }

    if(item.situacao == 1)
    {
      text_adotado = 'Definir como não adotado';
      icon_adotado = 'thumbs-down'
    }
    
    const actionSheet = this.actionSheetCtrl.create({
        title: 'Opções',
        buttons: [
          {
            text: text_adotado,
            icon: !this.platform.is('ios') ? icon_adotado : null,
            handler: () => {
              this.alterarStatus(dados);
            }
          }         
        ]
      });

      if(item.situacao == 0)
      {
        actionSheet.addButton({
          text: 'Editar',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.abrirModal(item);
          }
        });
      }
      
      actionSheet.addButton({
        text: 'Remover',
        icon: !this.platform.is('ios') ? 'trash' : null,
        handler: () => {
          let alert = this.alertCtrl.create({
            title: 'Confirmar?',
            message: 'Você deseja realmente remover o animal '+item.nome_animal+'?',
            buttons: [
              {
                text: 'Cancelar',
                role: 'Cancelar',
                handler: () => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'Remover',
                handler: () => {
                  this.removerPost(item);
                }
              }
            ]
          });
          alert.present();
          
        }
      });
      actionSheet.addButton({
        text: 'Cancelar',
        icon: !this.platform.is('ios') ? 'close' : null,
        handler: () => {
          console.log('Cancelar');
        }
      });
      

      actionSheet.present();
    
  }

  abrirModal(item)
  {
    let modal = this.modalCtrl.create(this.EditarPostPage, {'item': item});
    modal.present();
  }

  alterarStatus(dados)
  {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Processando...',
      showBackdrop: true
    });
    
    // let dados = {
    //   id: this.rest.userData().id
    // };

    loading.present().then(() => {
      this.rest.alterar_situacao_post(dados).then((data) => {
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
          this.postagens = data;
          let alert = this.alertCtrl.create({
            title: 'Sucesso',
            subTitle: 'Situação do animal alterada com sucesso.',
            buttons: ['Ok']
          });  
          alert.present();
        }
        
        
        console.log
      }).catch((error) => { loading.dismiss(); console.log(error); });
    });
  }

  removerPost(dados)
  {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Processando...',
      showBackdrop: true
    });
    
    // let dados = {
    //   id: this.rest.userData().id
    // };

    loading.present().then(() => {
      this.rest.remover_post(dados).then((data) => {
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
          this.postagens = data;
          let alert = this.alertCtrl.create({
            title: 'Sucesso',
            subTitle: 'Animal removido com sucesso.',
            buttons: ['Ok']
          });  
          alert.present();
        }
        
        
        console.log
      }).catch((error) => { loading.dismiss(); console.log(error); });
    });
  }
  

}
