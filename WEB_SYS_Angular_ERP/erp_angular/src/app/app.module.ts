import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { AuthModule } from './modules/auth/auth.module';
import { EmpresaModule } from './modules/empresa/empresa.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './interceptor/loading.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    EmpresaModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
