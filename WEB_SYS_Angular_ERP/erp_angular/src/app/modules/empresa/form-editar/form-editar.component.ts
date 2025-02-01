import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AlertaTypes } from '../../shared/alerta/alertaTypes';
import { PesquisaCepService } from 'src/app/services/pesquisa-cep.service';
import { CustomValidators } from 'src/app/validators/customValidators';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ModalService } from 'src/app/services/modal.service';
import { Subscription } from 'rxjs';
import { NotificacaoObserverTimeout } from 'src/adapted/notificacao/observer/notificacaoObserverTimeout';
import { KeysEnum, NotificacaoListenersService } from 'src/app/services/listeners/notificacao-listeners.service';
import { EmpresaOUT } from 'src/dominio/core/service/ports/io/empresa_IO';
import { EnderecoIN } from 'src/dominio/core/service/ports/io/endereco_IO';


@Component({
  selector: 'app-form-editar',
  templateUrl: './form-editar.component.html',
  styleUrls: ['./form-editar.component.css']
})
export class FormEditarComponent implements OnInit, OnDestroy {

  private empresa!: EmpresaOUT;
  public empresaForm!: FormGroup;
  public msgErro?: string;
  private subscription?: Subscription;

  constructor(private notificacaoListeners: NotificacaoListenersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cepService: PesquisaCepService,
    private empresaService: EmpresaService,
    private modalService: ModalService) {

    this.notificacaoListeners.setNotificacao(KeysEnum.Time, new NotificacaoObserverTimeout(3000));
    this.getEmpresa();
    this.clearMessage();
  }

  private getEmpresa() {

    let value = this.notificacaoListeners.getNotificacao(KeysEnum.EmpresaOUT)?.getValue();
    this.notificacaoListeners.destroyNotificacao(KeysEnum.EmpresaOUT);
    if (!value) {
      throw new Error("Empresa não foi passada");
    }
    this.empresa = value as EmpresaOUT;
  }

  private clearMessage() {
    this.subscription = this.notificacaoListeners.getNotificacao(KeysEnum.Time)?.getListiner().subscribe((value) => {
      this.msgErro = value;
    });
  }


  ngOnInit(): void {
    this.empresaForm = this.formBuilder.group({
      id: [this.empresa.getId(), [Validators.required]],
      nome: [this.empresa.getNome(), [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      cnpj: [{ value: this.empresa.getCnpj(), disabled: true }, [Validators.required, CustomValidators.CNPJValidator]],
      cep: [this.empresa.getEndereco().getCep(), [Validators.required, CustomValidators.CEPValidator]],
      numero: [this.empresa.getEndereco().getNumero(), [Validators.required]],
      logradouro: [{ value: this.empresa.getEndereco().getLogradouro(), disabled: true }, [Validators.required]],
      bairro: [{ value: this.empresa.getEndereco().getBairro(), disabled: true }, [Validators.required]],
      cidade: [{ value: this.empresa.getEndereco().getCidade(), disabled: true }, [Validators.required]],
      uf: [{ value: this.empresa.getEndereco().getUf(), disabled: true }, [Validators.required]]
    });
  }

  private preencherEndereco(endereco: EnderecoIN) {

    this.empresaForm.patchValue({
      logradouro: endereco.getLogradouro(),
      bairro: endereco.getBairro(),
      cidade: endereco.getCidade(),
      uf: endereco.getUf()
    });
  }

  public isValid(key: string) {
    const field = this.getFieldForm(key);
    return field.invalid && field.touched;
  }

  public getFieldForm(field: string) {
    return this.empresaForm.get(field) as FormControl;
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

  private resetEndereco() {
    this.empresaForm.patchValue({
      logradouro: null,
      bairro: null,
      cidade: null,
      uf: null
    });
  }

  public onClickVoltar() {
    this.router.navigate(['empresas']);
  }

  public onSubmit() {

    if (this.empresaForm.invalid) {
      this.markAsTouched();
      return;
    }

    this.salvarEmpresa();
  }

  private markAsTouched() {
    for (let field in this.empresaForm.value) {
      this.getFieldForm(field).markAsTouched();
    }
  }

  private salvarEmpresa() {
    
    try {

      this.updateEmpresaOUT();
      this.empresaService.atualizar(this.empresa);
      this.modalService.openModalAlertaSucess(`Empresa ${this.empresa.getNome()} atualizada com sucesso !!!`);
      this.onClickVoltar();

    } catch (error) {
      this.msgErro = (error as Error).message;
      this.notificacaoListeners.getNotificacao(KeysEnum.Time)?.notificar();
    }
  }

  private updateEmpresaOUT(): void {

    let nome: string = this.getFieldForm("nome").value;
    this.empresa.setNome(nome);
    this.empresa.getEndereco().setNumero(this.getFieldForm("numero").value);
    this.empresa.getEndereco().setBairro(this.getFieldForm("bairro").value);
    this.empresa.getEndereco().setCep(this.getFieldForm("cep").value);
    this.empresa.getEndereco().setCidade(this.getFieldForm("cidade").value);
    this.empresa.getEndereco().setLogradouro(this.getFieldForm("logradouro").value);
    this.empresa.getEndereco().setUf(this.getFieldForm("uf").value);
  }

  public getTipoAlerta() {
    return AlertaTypes.Danger;
  }

  ngOnDestroy(): void {
    this.notificacaoListeners.destroyNotificacao(KeysEnum.Time);
    this.subscription?.unsubscribe();
  }


}
