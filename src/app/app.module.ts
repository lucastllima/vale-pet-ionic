import { BuscaPage } from './../pages/busca/busca';
import { EditarPostPage } from './../pages/editar-post/editar-post';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { RegistroPage } from './../pages/registro/registro';
import { LoginPage } from './../pages/login/login';
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
import { RestProvider } from '../providers/rest/rest';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PhotoViewer } from '../../node_modules/@ionic-native/photo-viewer';

import { IonMaskModule } from '@pluritech/ion-mask';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AdicionarPage,
    PostagensPage,
    PostagemDetalhePage,
    PerfilPage,
    LoginPage,
    RegistroPage,
    EditarPostPage,
    BuscaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {backButtonText: ''}),
    HttpModule,
    IonMaskModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AdicionarPage,
    PostagensPage,
    PostagemDetalhePage,
    PerfilPage,
    LoginPage,
    RegistroPage,
    EditarPostPage,
    BuscaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Global,
    apiService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    Camera,
    ImagePicker,
    PhotoViewer,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true }
  ]
})
export class AppModule {}
