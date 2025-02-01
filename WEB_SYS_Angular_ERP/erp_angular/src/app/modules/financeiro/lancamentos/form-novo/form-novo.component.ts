import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { LancamentoINImpl } from 'src/adapted/dto/lancamentoDTO';
import { NotificacaoBooleanObserver } from 'src/adapted/notificacao/observer/notificacaoBooleanObserver';
import { NotificacaoObserverTimeout } from 'src/adapted/notificacao/observer/notificacaoObserverTimeout';
import { AlertaTypes } from 'src/app/modules/shared/alerta/alertaTypes';
import { ClienteService } from 'src/app/services/cliente.service';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { KeysEnum, NotificacaoListenersService } from 'src/app/services/listeners/notificacao-listeners.service';
import { ModalService } from 'src/app/services/modal.service';
import { ClienteOUT } from 'src/dominio/core/service/ports/io/cliente_IO';
import { ContaOUT } from 'src/dominio/core/service/ports/io/conta_IO';
import { EmpresaOUT } from 'src/dominio/core/service/ports/io/empresa_IO';
import { LancamentoIN } from 'src/dominio/core/service/ports/io/lancamento_IO';
import { TipoOperacaoEnum } from 'src/dominio/core/valueObject/tipoOperacao';

@Component({
  selector: 'app-form-novo',
  templateUrl: './form-novo.component.html',
  styleUrls: ['./form-novo.component.css']
})
export class FormNovoComponent implements OnInit, OnDestroy {

  private notificacao;
  public lancamentoForm!: FormGroup;
  public msgErro?: string;
  private subscription?: Subscription;
  private modalRef?: BsModalRef;
  private conta!: ContaOUT;
  private empresa!: EmpresaOUT;
  public clientes?: ClienteOUT[];
  public operacoes = Object.values(TipoOperacaoEnum);

  constructor(private formBuilder: FormBuilder,
    private notificacaoListeners: NotificacaoListenersService,
    private clienteService: ClienteService,
    private lancamentoService: LancamentoService,
    private modalService: ModalService) {

    this.notificacao = new NotificacaoBooleanObserver(true);
    this.notificacaoListeners.setNotificacao(KeysEnum.Time, new NotificacaoObserverTimeout(3000));
    this.clearMessage();
  }

  ngOnInit(): void {

    this.lancamentoForm = this.formBuilder.group({
      cliente: ["", [Validators.required]],
      operacao: ["", [Validators.required]],
      data: ["", [Validators.required]],
      valor: ["", [Validators.required]],
      descricao: ["", [Validators.required]]
    });
  }

  private loaderClientesForm() {
    this.clientes = this.clienteService.todosPorEmpresa(this.empresa);
  }

  private clearMessage() {
    this.subscription = this.notificacaoListeners.getNotificacao(KeysEnum.Time)?.getListiner().subscribe((value) => {
      this.msgErro = value;
    });
  } 

  public setConta(conta: ContaOUT) {
    this.conta = conta;
  }

  public setEmpresa(empresa: EmpresaOUT) {
    this.empresa = empresa;
    this.loaderClientesForm();
  }

  public getTipoAlerta() {
    return AlertaTypes.Danger;
  }

  public onSubmit() {

    try {

      let lancamento = this.salvarLancamento();
      this.lancamentoService.novo(lancamento);

      this.modalService.openModalAlertaSucess(`Lancamento salva com sucesso !!!`);
      this.notificacao.notificar();
      this.onDecline();

    } catch (error) {
 
      this.msgErro = (error as Error).message;
      this.notificacaoListeners.getNotificacao(KeysEnum.Time)?.notificar();
    }

  }

  public setModalRef(modalRef: BsModalRef) {
    this.modalRef = modalRef;
  }

  public onConfirm() {

    if (this.lancamentoForm.invalid) {
      this.markAsTouched();
      return;
    }

    this.onSubmit();
  }

  private markAsTouched() {
    for (let field in this.lancamentoForm.value) {
      this.getFieldForm(field).markAsTouched();
    }
  }

  public onDecline() {
    this.modalRef?.hide();
  }

  public isValid(key: string) {
    const field = this.getFieldForm(key);
    return field.invalid && field.touched;
  }

  private salvarLancamento() {
    return this.getLancamentoIN();
  }

  private getLancamentoIN(): LancamentoIN {

    let clienteId = Number(this.getFieldForm("cliente").value);
    let operacao: string = this.getFieldForm("operacao").value;
    let dataStr: string = this.getFieldForm("data").value;
    let valor: number = this.getFieldForm("valor").value;
    let descricao: string = this.getFieldForm("descricao").value;

    let lancamento = new LancamentoINImpl(descricao, Number(valor), operacao);
    lancamento.setData(this.dataConverter(dataStr));
    lancamento.setConta(this.conta);
    lancamento.setCliente(this.filterGetClienteOUT(clienteId));

    return lancamento;
  } 

  private dataConverter(dataStr:string){
    let data = new Date(Date.parse(dataStr));
    data.setDate(data.getDate() + 1);
    return new Date(data);
  }

  private filterGetClienteOUT(id: number) {

    let clienteOUT = this.clientes?.filter((cliente) => cliente.getID() === id)[0];
    if (!clienteOUT) {
      throw new Error("Cliente com id " + id + " não encontrado !!");
    }

    return clienteOUT;
  }

  public getFieldForm(field: string) {
    return this.lancamentoForm.get(field) as FormControl;
  }

  public getNotificador(){
    return this.notificacao.getNotificadorObserver().pipe(take(1));
  }

  ngOnDestroy(): void {
    this.notificacaoListeners.destroyNotificacao(KeysEnum.Time);
    this.subscription?.unsubscribe();
  }


}
