import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthPageDefaultComponent } from './auth-page-default/auth-page-default.component';
import { SharedModule } from '../shared/shared.module';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthPageDefaultComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule,
    DirectivesModule
  ],
  providers: []
})
export class AuthModule { }
