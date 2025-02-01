import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';
import { PaginationImpl } from 'src/adapted/paginacao/PaginationImpl';
import { ContaService } from 'src/app/services/conta.service';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { KeysEnum, NotificacaoListenersService } from 'src/app/services/listeners/notificacao-listeners.service';
import { ModalService } from 'src/app/services/modal.service';
import { ContaOUT } from 'src/dominio/core/service/ports/io/conta_IO';
import { EmpresaOUT } from 'src/dominio/core/service/ports/io/empresa_IO';
import { LancamentoOUT } from 'src/dominio/core/service/ports/io/lancamento_IO';
import { Pagination } from 'src/dominio/core/service/ports/io/pagination_IO';
import { IntervaloData } from 'src/dominio/core/valueObject/intervaloDada';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private modalRef?: BsModalRef;
  public msgErro?: string;
  public conta!: ContaOUT;
  public empresa!: EmpresaOUT;
  public lancamentos?: LancamentoOUT[];
  public periodoLancamentosForm!: FormGroup;
  public pagination: Pagination<LancamentoOUT[]>;

  constructor(
    private formBuilder: FormBuilder,
    private notificacaoListeners: NotificacaoListenersService,
    private contaService: ContaService,
    private lancamentoService: LancamentoService,
    private route: ActivatedRoute,
    private modalService: ModalService) {

    this.pagination = new PaginationImpl();

  }

  ngOnInit(): void {

    this.periodoLancamentosForm = this.formBuilder.group({
      data_init: ["", [Validators.required]],
      data_fim: ["", [Validators.required]]
    });

    this.preencherData();

    this.getEmpresa();
    const takeParams = this.route.params.pipe(take(1));
    takeParams.subscribe((params) => this.setConta(params));
    this.initLoaderLancamentosPorPeriodo();

  }

  private preencherData() {

    const dataNow = new Date();
    const dataPeriodo = new Date();
    dataPeriodo.setDate(dataNow.getDate() - 30);

    this.periodoLancamentosForm.patchValue({
      data_init: this.dataConverter(dataPeriodo),
      data_fim: this.dataConverter(dataNow)
    });
  }

  private initLoaderLancamentosPorPeriodo() {
    try {
      this.loaderLancamentosPorPeriodo();
    } catch (error) {
      this.modalService.openModalAlertaDanger((error as Error).message);
    }
  }

  private getEmpresa() {

    let value = this.notificacaoListeners.getNotificacao(KeysEnum.EmpresaOUT)?.getValue();
    this.notificacaoListeners.destroyNotificacao(KeysEnum.EmpresaOUT);
    if (!value) {
      throw new Error("Empresa não foi passada");
    }

    this.empresa = value as EmpresaOUT;
  }

  private dataConverter(data: Date) {
    return formatDate(data, 'yyyy-MM-dd', 'en-US');
  }


  private setConta(params: Params) {
    const { id } = params 
    if (id) {
      this.conta = this.contaService.pesquisarPorIDAssociadoEmpresa(this.empresa, Number(id));
    }
  }

  onClick() {
    this.modalService.openModalNovoLancamento(this.empresa, this.conta).subscribe((value) => {
      if (value) {
        this.initLoaderLancamentosPorPeriodo();
      }
    });
  }

  onEdit(lancamento: LancamentoOUT) {
    this.modalService.openModalEditarLancamento(this.empresa, lancamento).subscribe((value) => {
      if (value) {
        this.initLoaderLancamentosPorPeriodo();
      }
    });
  }

  public onDecline() {
    this.modalRef?.hide();
  }

  onDelete(lancamento: LancamentoOUT) {

    this.modalService.openModalConfirmWindow("Você confirma a desse Lançamento ?").subscribe((value) => {
      this.delete(value, lancamento);
    });
  }

  private delete(value: boolean, lancamento: LancamentoOUT) {

    try {

      if (value) {
        this.lancamentoService.deletarPorId(lancamento);
        this.pagination.setPagina(0);
        this.loaderLancamentosPorPeriodo();
      }

    } catch (error) {
      this.modalService.openModalAlertaDanger((error as Error).message);
    }

  }

  private loaderLancamentosPorPeriodo() {

    let dataStrInit: string = this.getFieldForm("data_init").value;
    let dataStrFim: string = this.getFieldForm("data_fim").value;

    const periodo = new IntervaloData(this.dataStrConverter(dataStrInit), this.dataStrConverter(dataStrFim));

    this.pagination = this.lancamentoService.buscarPorPeriodo(this.conta, this.pagination, periodo);
    this.lancamentos = this.pagination.getValue();

  }

  private dataStrConverter(dataStr: string) {
    let data = new Date(Date.parse(dataStr + "T00:00:00.000Z"));
    data.setDate(data.getDate() + 1);

    return new Date(data);
  }

  public getFieldForm(field: string) {
    return this.periodoLancamentosForm.get(field) as FormControl;
  }

  private markAsTouched() {
    for (let field in this.periodoLancamentosForm.value) {
      this.getFieldForm(field).markAsTouched();
    }
  }

  public isValid(key: string) {
    const field = this.getFieldForm(key);
    return field.invalid && field.touched;
  }

  public onClickNavPag(pag: number) {

    this.pagination.navPag(pag);
    this.initLoaderLancamentosPorPeriodo();
  }

  public onClickNavNext() {

    this.pagination.navNext();
    this.initLoaderLancamentosPorPeriodo();
  }

  public onClickNavPrevious() {

    this.pagination.navPrevious();
    this.initLoaderLancamentosPorPeriodo();
  }

  public onClickFiltro() {

    if (this.periodoLancamentosForm.invalid) {
      this.markAsTouched();
      return;
    }

    this.onSubmit();
  }

  public onSubmit() {
    this.initLoaderLancamentosPorPeriodo();
  }

  public setModalRef(modalRef: BsModalRef) {
    this.modalRef = modalRef;
  }

}
