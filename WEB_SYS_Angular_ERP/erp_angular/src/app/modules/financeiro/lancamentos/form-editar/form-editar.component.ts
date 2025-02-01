import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { LancamentoOUTImpl } from 'src/adapted/dto/lancamentoDTO';
import { NotificacaoBooleanObserver } from 'src/adapted/notificacao/observer/notificacaoBooleanObserver';
import { NotificacaoObserverTimeout } from 'src/adapted/notificacao/observer/notificacaoObserverTimeout';
import { AlertaTypes } from 'src/app/modules/shared/alerta/alertaTypes';
import { ClienteService } from 'src/app/services/cliente.service';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { KeysEnum, NotificacaoListenersService } from 'src/app/services/listeners/notificacao-listeners.service';
import { ModalService } from 'src/app/services/modal.service';
import { ClienteOUT } from 'src/dominio/core/service/ports/io/cliente_IO';
import { EmpresaOUT } from 'src/dominio/core/service/ports/io/empresa_IO';
import { LancamentoOUT } from 'src/dominio/core/service/ports/io/lancamento_IO';
import { TipoOperacaoEnum } from 'src/dominio/core/valueObject/tipoOperacao';

@Component({
  selector: 'app-form-editar',
  templateUrl: './form-editar.component.html',
  styleUrls: ['./form-editar.component.css']
})
export class FormEditarComponent implements OnInit, OnDestroy  {

  private notificacao;
  public lancamentoForm!: FormGroup;
  public msgErro?: string;
  private subscription?: Subscription;
  private modalRef?: BsModalRef;
  private lancamento!: LancamentoOUT;
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

  private clearMessage() {
    this.subscription = this.notificacaoListeners.getNotificacao(KeysEnum.Time)?.getListiner().subscribe((value) => {
      this.msgErro = value;
    });
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

  private preencherLancamento() {

    this.lancamentoForm.patchValue({
      cliente: this.lancamento.getClienteOUT().getID(),
      operacao: this.lancamento.getTipoOperacao(),
      valor: this.valorConverter(this.lancamento.getValor()),
      data: this.dataConverter(this.lancamento.getData()),
      descricao: this.lancamento.getDescricao()
    });
  }

  private valorConverter(valorStr: string) {
    const valor = valorStr.replace(/[R$]/g, "").replace(/,/g, ".").trim();
    return Number.parseFloat(valor).toFixed(2);
  }

  private dataConverter(data: Date) {
    return formatDate(data, 'yyyy-MM-dd', 'en-US');
  }

  public setLancamento(lancamento: LancamentoOUT) {
    this.lancamento = lancamento;
    this.preencherLancamento();
  }

  public setEmpresa(empresa: EmpresaOUT) {
    this.empresa = empresa;
    this.loaderClientesForm();
  }

  public setModalRef(modalRef: BsModalRef) {
    this.modalRef = modalRef;
  }

  private loaderClientesForm() {
    this.clientes = this.clienteService.todosPorEmpresa(this.empresa);
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

  public getTipoAlerta() {
    return AlertaTypes.Danger;
  }

  public onSubmit() {

    try {

      let lancamento = this.getLancamentoOUT();
      this.lancamentoService.atualizar(lancamento);
      this.modalService.openModalAlertaSucess(`Lancamento salva com sucesso !!!`);
      this.notificacao.notificar();
      this.onDecline();

    } catch (error) {

      this.msgErro = (error as Error).message;
      this.notificacaoListeners.getNotificacao(KeysEnum.Time)?.notificar();
    }
  }

  private getLancamentoOUT(): LancamentoOUT {

    let clienteId = Number(this.getFieldForm("cliente").value);
    let operacao: string = this.getFieldForm("operacao").value;
    let dataStr: string = this.getFieldForm("data").value;
    let valor: number = this.getFieldForm("valor").value;
    let descricao: string = this.getFieldForm("descricao").value;

    const lancamentoNew = new LancamentoOUTImpl(this.lancamento.getId(), this.lancamento.getIdConta());

    lancamentoNew.setDescricao(descricao);
    lancamentoNew.setData(this.dataStrConverter(dataStr));
    lancamentoNew.setValor(Number(valor));
    lancamentoNew.setTipoOperacao(operacao);
    lancamentoNew.setClienteOUT(this.filterListClienteOUT(clienteId));

    return lancamentoNew;
  }

  private dataStrConverter(dataStr: string) {
    let data = new Date(Date.parse(dataStr + "T00:00:00.000Z"));
    data.setDate(data.getDate() + 1);
    return new Date(data);
  }

  private filterListClienteOUT(id: number) {

    let clienteOUT = this.clientes?.filter((cliente) => cliente.getID() === id)[0];
    if (!clienteOUT) {
      throw new Error("Cliente com id " + id + " não encontrado !!");
    }

    return clienteOUT;
  }

  public getFieldForm(field: string) {
    return this.lancamentoForm.get(field) as FormControl;
  }

  public getNotificador() {
    return this.notificacao.getNotificadorObserver().pipe(take(1));
  }

  ngOnDestroy(): void {
    this.notificacaoListeners.destroyNotificacao(KeysEnum.Time);
    this.subscription?.unsubscribe();
  }

}
