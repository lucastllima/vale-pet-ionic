import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AdicionarPage } from '../pages/adicionar/adicionar';
import { PerfilPage } from '../pages/perfil/perfil';
import { PostagensPage } from '../pages/postagens/postagens';
import { RestProvider } from '../providers/rest/rest';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  AdicionarPage:any = AdicionarPage;
  PerfilPage:any = PerfilPage;
  PostagensPage:any = PostagensPage;

  pages: Array<{title: string, component: any, icon: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public rest: RestProvider,
    public loadingCtrl: LoadingController    
  ) {
    this.initializeApp();
    
    // used for an example of ngFor and navigation
    this.pages = [
      //{ title: 'Início', component: HomePage, icon: 'fas fa-home' },
      // { title: 'List', component: ListPage, icon: 'ion-ios-home-outline' },
      // { title: 'Novo Anúncio', component: AdicionarPage, icon: 'fas fa-plus' },
      //{ title: 'Meus Anúncios', component: PostagensPage, icon: 'fas fa-file-alt' },
      //{ title: 'Meu Perfil', component: PerfilPage, icon: 'fas fa-user' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if(localStorage.getItem('user'))
        this.rootPage = HomePage;
      else
        this.rootPage = LoginPage;
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);
    this.nav.setRoot(page);
  }

  pushPage(page) {
    this.nav.push(page);
  }

  logout()
  {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Processando...',
      showBackdrop: false
    });
    

    loading.present().then(() => {
      this.rest.logout().then((data) => {
        loading.dismiss();
        if(data.success)
        {
          localStorage.clear();
          this.nav.setRoot(LoginPage);
        }
      }).catch((error) => { loading.dismiss(); console.log(error); });
    });
  }
}
