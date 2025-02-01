import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthPageDefaultComponent } from './auth-page-default/auth-page-default.component';

const routes: Routes = [
  {
    path: "", component: LoginComponent
  },
  {
    path: "auth", component: AuthPageDefaultComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "signup", component: SignupComponent },
      { path: "**", component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
