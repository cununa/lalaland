import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ModalCtrl, Utils, Connect, User, Device, ToastCtrl, AlertCtrl } from '../providers/cat/cat';
import { HttpModule } from '@angular/http';
import { NoteProvider } from '../providers/NoteProvider';
import { CustomerProvider } from '../providers/CustomerProvider';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      mode:'md'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ModalCtrl,
    Utils,
    Connect,
    User,
    Device,
    ToastCtrl,
    AlertCtrl,
    NoteProvider,
    CustomerProvider
  ]
})
export class AppModule {}
