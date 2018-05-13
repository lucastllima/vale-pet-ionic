import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AdicionarPage } from '../pages/adicionar/adicionar';
import { PostagemDetalhePage } from '../pages/postagem-detalhe/postagem-detalhe';
import { PostagensPage } from '../pages/postagens/postagens';
import { PerfilPage } from '../pages/perfil/perfil';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Global } from './global';
import { apiService } from '../providers/api-service';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AdicionarPage,
    PostagensPage,
    PostagemDetalhePage,
    PerfilPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AdicionarPage,
    PostagensPage,
    PostagemDetalhePage,
    PerfilPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Global,
    apiService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
