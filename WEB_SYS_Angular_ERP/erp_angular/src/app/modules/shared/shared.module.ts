import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertaComponent } from './alerta/alerta.component';
import { LoadingComponent } from './loading/loading.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmWindowComponent } from './confirm-window/confirm-window.component';
import { ErrorHTMLComponent } from './error-html/generic/error-html.component';
import { Html404Component } from './error-html/html404/html404.component';

@NgModule({
  declarations: [
    AlertaComponent,
    LoadingComponent,
    ConfirmWindowComponent,
    ErrorHTMLComponent,
    Html404Component
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  exports: [
    AlertaComponent,
    Html404Component
]})
export class SharedModule { }
