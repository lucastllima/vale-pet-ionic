import { BuscaPage } from './../busca/busca';
import { AdicionarPage } from './../adicionar/adicionar';
import { RestProvider } from './../../providers/rest/rest';
import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, Loading, LoadingController, Events, ModalController, NavParams } from 'ionic-angular';
import { Global } from '../../app/global';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('slider') slider: Slides;
  postagens:any;
  // onSlideChanged() {
  //   const currentIndex = this.slider.getActiveIndex();
  //   console.log('Slide changed! Current index is', currentIndex);
  // }
  AdicionarPage:any = AdicionarPage;
  BuscaPage:any = BuscaPage;
  modal:any = null;
  isbusca:any = false;

  constructor(
    public navCtrl: NavController,
    public global: Global,
    public rest: RestProvider,
    public loadingCtrl: LoadingController,
    public events: Events,
    public modalCtrl:ModalController,
    public navParams: NavParams
  ) {
    events.subscribe('user:created', (user, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      // console.log(this.navCtrl.canGoBack());
      // console.log('Welcome', user, 'at', time);
    });
    console.log('teste');
  }
  ionViewWillEnter()
  {
   
    this.modal = this.modalCtrl.create(this.BuscaPage);
    this.modal.onDidDismiss((result) =>{
      if(result){
        this.buscarPosts(result.pesquisa);
        this.isbusca = true;
        console.log(result);
      }
    });
    
    if(!this.isbusca)
    {
      this.obterPosts();
    }
    
  }

  ionViewDidEnter()
  {
    
  }
  ionViewDidLoad()
  {
    
  }

  buscarPosts(dados)
  {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Processando...',
      showBackdrop: true
    });

    loading.present().then(() => {
      this.rest.buscar_post(dados).then((data) => {
        loading.dismiss();
        this.postagens = data;
        console.log(data);
      }).catch((error) => { loading.dismiss(); console.log(error); });
    });

  }

  obterPosts()
  {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Processando...',
      showBackdrop: true
    });
    

    loading.present().then(() => {
      this.rest.posts().then((data) => {
        loading.dismiss();
        this.postagens = data;
        console.log(data);
      }).catch((error) => { loading.dismiss(); console.log(error); });
    });
  }

  doRefresh(refresher) {
    this.rest.posts().then((data) => {      
      this.postagens = data;
      refresher.complete();
    }).catch((error) => {refresher.complete();  console.log(error); });
  }

  definirSexo(sexo): string
  {
    if (sexo == 1) 
      return 'Fêmea'
    else
      return 'Macho'
  }

  definirTipo(tipo): string
  {
    if (tipo == 1) 
      return 'Cachorro'
    else if (tipo == 2)
      return 'Gato'
    else if(tipo == 0)
      return 'Outro'
  }

  definirIdade(idade): string
  {
    if (idade == 1) 
      return '1 a 6 meses'
    else if(idade == 2) 
      return '7 a 12 meses'
    else if(idade == 3) 
      return '1 a 3 anos'
    else if(idade == 4) 
      return 'Acima de 3 anos'
    
  }

  mtel(v){
    v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return v;
  }

  buscar()
  {
    this.modal.present();
  }

  


}
