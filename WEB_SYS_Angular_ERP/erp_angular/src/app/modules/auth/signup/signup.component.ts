import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidators } from 'src/app/validators/customValidators';
import { AlertaTypes } from '../../shared/alerta/alertaTypes';
import { NotificacaoObserverTimeout } from 'src/adapted/notificacao/observer/notificacaoObserverTimeout';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { UsuarioINImpl } from 'src/adapted/dto/usuarioDTO';
import { KeysEnum, NotificacaoListenersService } from 'src/app/services/listeners/notificacao-listeners.service';
import { UsuarioIN } from 'src/dominio/core/service/ports/io/usuario_IO';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  public authForm!: UntypedFormGroup;
  public msgErro?: string;
  private subscription?: Subscription;

  constructor(private formBuilder: UntypedFormBuilder,
    private authService: AuthService, private router: Router, private modalService: ModalService,
    private notificacaoListeners: NotificacaoListenersService) {

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
      nome: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      email: ["", [Validators.required, Validators.email]],
      passwords: this.formBuilder.group({
        password: ["", [Validators.required]],
        confirme_password: ["", [Validators.required]]
      }, { validators: [CustomValidators.passwordConfirmeValidator] }),
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
      this.markAsTouchedAll(this.authForm);
      return;
    }

    try {

      let usuario = this.getUsuarioIN();
      this.authService.signup(usuario);
      this.modalService.openModalAlertaSucess(`Usuário ${usuario.getNome()} salva com sucesso !!!`);
      this.onClickVoltar();

    } catch (error) {
      this.msgErro = (error as Error).message;
      this.notificacaoListeners.getNotificacao(KeysEnum.Time)?.notificar();
      this.getFieldForm("email").patchValue("");
    }

  }

  private getUsuarioIN(): UsuarioIN {

    const nome = this.authForm.get("nome")?.value;
    const email = this.authForm.get("email")?.value;
    const password = this.authForm.get("passwords.password")?.value;

    const usuario = new UsuarioINImpl(email, password);
    usuario.setNome(nome);

    return usuario;

  }

  private markAsTouchedAll(form: UntypedFormGroup) {

    Object.keys(form.controls).forEach((key) => {
      if (form.get(key) instanceof UntypedFormGroup) {
        this.markAsTouchedAll(form.get(key) as UntypedFormGroup);
        return;
      }
      form.get(key)?.markAsTouched();
    });
  }

  public getFieldForm(field: string): AbstractControl {
    return this.authForm.get(field) as AbstractControl;
  }

  public isValid(key: string) {
    const field = this.getFieldForm(key);
    return field.invalid && field.touched;
  }

  public getTipoAlerta() {
    return AlertaTypes.Danger;
  }

  private onClickVoltar() {
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy(): void {
    this.notificacaoListeners.destroyNotificacao(KeysEnum.Time);
    this.subscription?.unsubscribe();
  }

}