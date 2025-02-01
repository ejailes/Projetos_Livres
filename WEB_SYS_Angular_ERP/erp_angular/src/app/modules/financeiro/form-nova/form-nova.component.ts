import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContaINImpl } from 'src/adapted/dto/contaDTO';
import { NotificacaoObserverTimeout } from 'src/adapted/notificacao/observer/notificacaoObserverTimeout';
import { ContaService } from 'src/app/services/conta.service';
import { KeysEnum, NotificacaoListenersService } from 'src/app/services/listeners/notificacao-listeners.service';
import { CustomValidators } from 'src/app/validators/customValidators';
import { ContaIN } from 'src/dominio/core/service/ports/io/conta_IO';
import { NumeroConta } from 'src/dominio/core/valueObject/numeroConta';
import { AlertaTypes } from '../../shared/alerta/alertaTypes';
import { ModalService } from 'src/app/services/modal.service';
import { EmpresaOUT } from 'src/dominio/core/service/ports/io/empresa_IO';

@Component({
  selector: 'app-form-nova',
  templateUrl: './form-nova.component.html',
  styleUrls: ['./form-nova.component.css']
})
export class FormNovaComponent implements OnInit, OnDestroy {

  private empresa!: EmpresaOUT;
  public empresaForm!: FormGroup;
  private subscription?: Subscription;
  public msgErro?: string;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private notificacaoListeners: NotificacaoListenersService, private route: ActivatedRoute,
    private contaService:ContaService, private modalService: ModalService) {
      
    this.getEmpresa();
    this.notificacaoListeners.setNotificacao(KeysEnum.Time, new NotificacaoObserverTimeout(3000));
    this.clearMessage();
  }

  private getEmpresa() {

    let value = this.notificacaoListeners.getNotificacao(KeysEnum.EmpresaOUT)?.getValue();
    this.notificacaoListeners.destroyNotificacao(KeysEnum.Time);
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
      nome: [{ value: this.empresa.getNome(), disabled: true }, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      cnpj: [{ value: this.empresa.getCnpj(), disabled: true }, [Validators.required, CustomValidators.CNPJValidator]],
      nomeBanco: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      numeroAg: ["", [Validators.required, CustomValidators.numberValidatorLengthMinMax(5)]],
      numeroConta: ["", [Validators.required, CustomValidators.numberValidatorLengthMinMax(3, 6)]],
      digito: ["", [Validators.required, CustomValidators.numberValidatorLengthMinMax(1)]],
      tipoConta: ["", [Validators.required]],
    });
  }

  public isValid(key: string) {
    const field = this.getFieldForm(key);
    return field.invalid && field.touched;
  }

  public getFieldForm(field: string) {
    return this.empresaForm.get(field) as FormControl;
  }

  onClickVoltar() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  public onSubmit() {

    if (this.empresaForm.invalid) {
      this.markAsTouched();
      return;
    }

    this.salvarConta();
  }

  private markAsTouched() {
    for (let field in this.empresaForm.value) {
      this.getFieldForm(field).markAsTouched();
    }
  }

  private salvarConta() {

    try {

      let conta = this.getContaIN();
      this.contaService.nova(conta);
      this.modalService.openModalAlertaSucess(`Conta ${conta.getNomeBanco()} salva com sucesso !!!`);
      this.onClickVoltar();

    } catch (error) {
      this.msgErro = (error as Error).message;
      this.notificacaoListeners.getNotificacao(KeysEnum.Time)?.notificar();
    }
  }

  private getContaIN(): ContaIN {

    let nomeBanco: string = this.getFieldForm("nomeBanco").value;
    let numeroAg: number = Number.parseInt(this.getFieldForm("numeroAg").value);
    let numeroConta: number = Number.parseInt(this.getFieldForm("numeroConta").value);
    let digito: number = Number.parseInt(this.getFieldForm("digito").value);
    let tipoConta: string = this.getFieldForm("tipoConta").value;

    let conta = new ContaINImpl(this.empresa);
    conta.setNomeBanco(nomeBanco);
    conta.setNumAgencia(numeroAg);
    conta.setConta(new NumeroConta(numeroConta, digito));
    conta.setTipoConta(tipoConta);

    return conta;
  }

  public getTipoAlerta() {
    return AlertaTypes.Danger;
  }

  ngOnDestroy(): void {
    this.notificacaoListeners.destroyNotificacao(KeysEnum.Time);
    this.subscription?.unsubscribe();
  }

}
