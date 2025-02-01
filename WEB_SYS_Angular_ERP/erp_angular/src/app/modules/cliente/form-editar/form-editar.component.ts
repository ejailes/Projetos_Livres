import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificacaoObserverTimeout } from 'src/adapted/notificacao/observer/notificacaoObserverTimeout';
import { ClienteService } from 'src/app/services/cliente.service';
import { KeysEnum, NotificacaoListenersService } from 'src/app/services/listeners/notificacao-listeners.service';
import { ModalService } from 'src/app/services/modal.service';
import { AlertaTypes } from '../../shared/alerta/alertaTypes';
import { take } from 'rxjs/operators';
import { ClienteOUT } from 'src/dominio/core/service/ports/io/cliente_IO';

@Component({
  selector: 'app-form-editar',
  templateUrl: './form-editar.component.html',
  styleUrls: ['./form-editar.component.css']
})
export class FormEditarComponent implements OnInit {

  public clienteForm!: FormGroup;
  private cliente!: ClienteOUT;
  public msgErro?: string;

  constructor(private clienteService: ClienteService, private notificacaoListeners: NotificacaoListenersService,
    private formBuilder: FormBuilder, private modalService: ModalService,
    private router: Router, private route: ActivatedRoute) {

    this.notificacaoListeners.setNotificacao(KeysEnum.Time, new NotificacaoObserverTimeout(3000));
    this.getCliente();

  }

  private getCliente() {
    const takeParams = this.route.params.pipe(take(1));
    takeParams.subscribe((params) => this.setCliente(params));
  }

  ngOnInit(): void {
    this.clienteForm = this.formBuilder.group({
      nome: [this.cliente.getNome(), [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      tipo: [{ value: this.cliente.getTipo(), disabled: true }, [Validators.required]],
      cpf_cnpj: [{ value: this.cliente.getCpf_Cnpj(), disabled: true }, Validators.required]
    });
  }

  private setCliente(params: Params) {
    const { id } = params;
    if (id) {
      this.cliente = this.clienteService.porId(Number(id));
    }
  }

  public onSubmit() {

    if (this.clienteForm.invalid) {
      this.markAsTouched();
      return;
    }

    this.salvarCliente();
  }

  private salvarCliente() {

    try {

      let cliente = this.updateClienteOUT();
      this.clienteService.atualizar(cliente);

      this.modalService.openModalAlertaSucess(`Cliente ${cliente.getNome()} alterado com sucesso !!!`);
      this.onClickCancelar();

    } catch (error) {
      this.msgErro = (error as Error).message;
      this.notificacaoListeners.getNotificacao(KeysEnum.Time)?.notificar();
    }
  }

  private updateClienteOUT(): ClienteOUT {

    let nome: string = this.getFieldForm("nome").value;
    this.cliente.setNome(nome);

    return this.cliente;
  }

  private markAsTouched() {
    for (let field in this.clienteForm.value) {
      this.getFieldForm(field).markAsTouched();
    }
  }

  public getFieldForm(field: string) {
    return this.clienteForm.get(field) as FormControl;
  }

  public isValid(key: string) {
    const field = this.getFieldForm(key);
    return field.invalid && field.touched;
  }

  public getTipoAlerta() {
    return AlertaTypes.Danger;
  }

  public onClickCancelar() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

}
