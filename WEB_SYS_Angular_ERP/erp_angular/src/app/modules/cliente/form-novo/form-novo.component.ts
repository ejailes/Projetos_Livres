import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/validators/customValidators';
import { AlertaTypes } from '../../shared/alerta/alertaTypes';
import { map } from 'rxjs/operators';
import { ClienteService } from 'src/app/services/cliente.service';
import { ClienteIN } from 'src/dominio/core/service/ports/io/cliente_IO';
import { ClienteINImpl } from 'src/adapted/dto/clienteDTO';
import { ModalService } from 'src/app/services/modal.service';
import { KeysEnum, NotificacaoListenersService } from 'src/app/services/listeners/notificacao-listeners.service';
import { NotificacaoObserverTimeout } from 'src/adapted/notificacao/observer/notificacaoObserverTimeout';
import { Subscription } from 'rxjs';
import { EmpresaOUT } from 'src/dominio/core/service/ports/io/empresa_IO';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/dominio/core/entity/cliente';

@Component({
  selector: 'app-form-novo',
  templateUrl: './form-novo.component.html',
  styleUrls: ['./form-novo.component.css']
})
export class FormNovoComponent implements OnInit, OnDestroy {

  public clienteForm!: FormGroup;
  public msgErro?: string;
  private empresa!: EmpresaOUT;
  private subscription?: Subscription;
  public tipos = Object.values(Cliente.Tipo);

  private selectedTipo: string = "";
  public maskCpfCnpj = "00.000.000/0000-00";

  constructor(private formBuilder: FormBuilder, private modalService: ModalService,
    private clienteService: ClienteService, private router: Router, private route: ActivatedRoute,
    private notificacaoListeners: NotificacaoListenersService) {

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
  
    this.clienteForm = this.formBuilder.group({
      nome: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      tipo: ["", [Validators.required]],
      cpf_cnpj: [{ value: "", disabled: true }, [Validators.required, this.CPFCNPJValidator.bind(this)]]
    });

    this.onTipoCliente();
  }

  public onSubmit() {

    if (this.clienteForm.invalid) {
      this.markAsTouched();
      return;
    }

    this.salvarCliente();
  }

  private markAsTouched() {
    for (let field in this.clienteForm.value) {
      this.getFieldForm(field).markAsTouched();
    }
  }

  private salvarCliente() {

    try {
      let cliente = this.getClienteIN();
      this.clienteService.novo(cliente);
      this.modalService.openModalAlertaSucess(`Cliente ${cliente.getNome()} salva com sucesso !!!`);
      this.onClickVoltar();

    } catch (error) {
      this.msgErro = (error as Error).message;
      this.notificacaoListeners.getNotificacao(KeysEnum.Time)?.notificar();
    }
  }

  private getClienteIN(): ClienteIN {

    let nome: string = this.getFieldForm("nome").value;
    let cpf_cnpj: string = this.getFieldForm("cpf_cnpj").value;
    let tipo: string = this.getFieldForm("tipo").value;

    let cliente = new ClienteINImpl(nome, cpf_cnpj);
    cliente.setTipo(tipo);
    cliente.setEmpresa(this.empresa);

    return cliente;
  }

  private onTipoCliente() {

    this.getFieldForm("tipo").valueChanges
      .pipe(map((value) => {

        if (value === this.tipos[0]) {
          this.getFieldForm("cpf_cnpj").enable();
          this.getFieldForm("cpf_cnpj").reset();
          this.selectedTipo = "cpf";
          this.maskCpfCnpj = "000.000.000-00";

        } else if (value === this.tipos[1]) {
          this.getFieldForm("cpf_cnpj").enable();
          this.getFieldForm("cpf_cnpj").reset();
          this.selectedTipo = "cnpj";
          this.maskCpfCnpj = "00.000.000/0000-00";
        }

        else {
          this.getFieldForm("cpf_cnpj").disable();
        }
        return value;

      }))
      .subscribe();
  }

  public onClickVoltar() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  public isValid(key: string) {
    const field = this.getFieldForm(key);
    return field.invalid && field.touched;
  }

  public getFieldForm(field: string) {
    return this.clienteForm.get(field) as FormControl;
  }

  public getTipoAlerta() {
    return AlertaTypes.Danger;
  }

  private CPFCNPJValidator(control: AbstractControl) {

    let result = {};
    let cpf_cnpj = control.value;

    switch (this.selectedTipo) {
      case "cnpj": {
        result = CustomValidators.REGEX_CNPJ.test(cpf_cnpj) ? {} : { CNPJError: true };
        break;
      }
      case "cpf": {
        result = result = CustomValidators.REGEX_CPF.test(cpf_cnpj) ? {} : { CPFError: true };
        break;
      }

    }

    return result;
  }

  ngOnDestroy(): void {
    this.notificacaoListeners.destroyNotificacao(KeysEnum.Time);
    this.subscription?.unsubscribe();
  }

}
