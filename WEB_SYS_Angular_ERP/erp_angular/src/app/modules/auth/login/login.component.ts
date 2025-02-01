import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertaTypes } from '../../shared/alerta/alertaTypes';
import { NotificacaoObserverTimeout } from 'src/adapted/notificacao/observer/notificacaoObserverTimeout';
import { Subscription } from 'rxjs';
import { UsuarioINImpl } from 'src/adapted/dto/usuarioDTO';
import { KeysEnum, NotificacaoListenersService } from 'src/app/services/listeners/notificacao-listeners.service';
import { UsuarioIN } from 'src/dominio/core/service/ports/io/usuario_IO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public authForm!: UntypedFormGroup;
  public msgErro?: any;
  private subscription?: Subscription;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private notificacaoListeners: NotificacaoListenersService, private router: Router) {

    this.notificacaoListeners.setNotificacao(KeysEnum.Time, new NotificacaoObserverTimeout(4000));
    this.clearMessage();
  }

  private clearMessage() {
    this.subscription = this.notificacaoListeners.getNotificacao(KeysEnum.Time)?.getListiner().subscribe((value) => {
      this.msgErro = value;
    });
  }

  ngOnInit(): void {

    this.redirect();

    this.authForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(8)]]
    });
  }

  private redirect() {

    try {
      this.authService.getLogged();
      this.router.navigate(['empresas']);

    } catch (error) {
      //console.log(error);
    }
  }

  public onSubmit() {

    if (this.authForm.invalid) {
      this.markAsTouched();
      return;
    }

    this.checkLogin();
  }

  private markAsTouched() {
    for (let field in this.authForm.value) {
      this.getFieldForm(field).markAsTouched();
    }
  }

  public getFieldForm(field: string) {
    return this.authForm.get(field) as UntypedFormControl;
  }

  private checkLogin() {

    try {
      this.authService.login(this.getUsuarioIn());
    } catch (error) {
      this.msgErro = (error as Error).message;
      this.notificacaoListeners.getNotificacao(KeysEnum.Time)?.notificar();
      this.getFieldForm("password").patchValue("");
    }
  }

  private getUsuarioIn(): UsuarioIN {

    const email = this.authForm.get("email")?.value;
    const password = this.authForm.get("password")?.value

    return new UsuarioINImpl(email, password);
  }

  public isValid(key: string) {
    const field = this.getFieldForm(key);
    return field.invalid && field.touched;
  }

  public getTipoAlerta() {
    return AlertaTypes.Danger;
  }

  ngOnDestroy(): void {
    this.notificacaoListeners.destroyNotificacao(KeysEnum.Time);
    this.subscription?.unsubscribe();
  }

}
