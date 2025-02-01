import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmpresaINImpl } from 'src/adapted/dto/empresaDTO';
import { AuthService } from 'src/app/services/auth.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { PesquisaCepService } from 'src/app/services/pesquisa-cep.service';
import { CustomValidators } from 'src/app/validators/customValidators';
import { AlertaTypes } from '../../shared/alerta/alertaTypes';
import { NotificacaoObserverTimeout } from 'src/adapted/notificacao/observer/notificacaoObserverTimeout';
import { ModalService } from 'src/app/services/modal.service';
import { KeysEnum, NotificacaoListenersService } from 'src/app/services/listeners/notificacao-listeners.service';
import { EmpresaIN } from 'src/dominio/core/service/ports/io/empresa_IO';
import { EnderecoIN } from 'src/dominio/core/service/ports/io/endereco_IO';

@Component({
  selector: 'app-form-nova',
  templateUrl: './form-nova.component.html',
  styleUrls: ['./form-nova.component.css']
})
export class FormNovaComponent implements OnInit, OnDestroy {

  public empresaForm!: FormGroup;
  private endereco?: EnderecoIN;
  public msgErro?: string;
  private subscription?: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private empresaService: EmpresaService,
    private cepService: PesquisaCepService,
    private modalService: ModalService,
    private notificacaoListeners: NotificacaoListenersService) {

    this.notificacaoListeners.setNotificacao(KeysEnum.Time, new NotificacaoObserverTimeout(3000));
    this.clearMessage();
  }

  private clearMessage() {
    this.subscription = this.notificacaoListeners.getNotificacao(KeysEnum.Time)?.getListiner().subscribe((value) => {
      this.msgErro = value;
    });
  }

  ngOnInit(): void {
    this.empresaForm = this.formBuilder.group({
      nome: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      cnpj: ["", [Validators.required, CustomValidators.CNPJValidator]],
      cep: ["", [Validators.required, CustomValidators.CEPValidator]],
      numero: ["", [Validators.required]],
      logradouro: [{ value: "", disabled: true }, [Validators.required]],
      bairro: [{ value: "", disabled: true }, [Validators.required]],
      cidade: [{ value: "", disabled: true }, [Validators.required]],
      uf: [{ value: "", disabled: true }, [Validators.required]]
    });
  }

  public onSubmit() {

    if (this.empresaForm.invalid) {
      this.markAsTouched();
      return;
    }

    this.salvarEmpresa();
  }

  public onBlur() {
    this.pesquisarCEP(this.empresaForm.get("cep")?.value);
  }

  private pesquisarCEP(cep: string) {

    if (this.getFieldForm("cep").invalid) {
      return;
    }

    this.cepService.setCep(cep);
    this.cepService.execute().subscribe({
      next: endereco => {
        this.preencherEndereco(endereco);
      },
      error: err => {
        this.resetEndereco();
        if (err.CEPError) {
          this.empresaForm.get("cep")?.setErrors(err);
          return;
        }
        this.empresaForm.get("cep")?.setErrors(err);
      }
    });
  }

  private preencherEndereco(endereco: EnderecoIN) {

    this.endereco = endereco;
    this.empresaForm.patchValue({
      logradouro: endereco.getLogradouro(),
      bairro: endereco.getBairro(),
      cidade: endereco.getCidade(),
      uf: endereco.getUf()
    });
  }

  private resetEndereco() {
    this.endereco = undefined;
    this.empresaForm.patchValue({
      logradouro: null,
      bairro: null,
      cidade: null,
      uf: null
    });
  }

  private salvarEmpresa() {

    try {
      let empresa = this.getEmpresaIN();
      this.empresaService.nova(empresa);
      this.modalService.openModalAlertaSucess(`Empresa ${empresa.getNome()} salva com sucesso !!!`);
      this.onClickVoltar();

    } catch (error) {
      this.msgErro = (error as Error).message;
      this.notificacaoListeners.getNotificacao(KeysEnum.Time)?.notificar();
    }
  }

  private getEmpresaIN(): EmpresaIN {

    let nome: string = this.getFieldForm("nome").value;
    let cnpj: string = this.getFieldForm("cnpj").value;
    this.endereco?.setNumero(this.getFieldForm("numero").value);

    let empresa = new EmpresaINImpl(nome, cnpj);
    empresa.setUsuario(this.authService.getLogged());
    empresa.setEndereco(this.endereco)

    return empresa;
  }

  private markAsTouched() {
    for (let field in this.empresaForm.value) {
      this.getFieldForm(field).markAsTouched();
    }
  }

  public getFieldForm(field: string) {
    return this.empresaForm.get(field) as FormControl;
  }

  public onClickVoltar() {
    this.router.navigate(['empresas']);
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
