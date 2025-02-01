import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoadingComponent } from '../modules/shared/loading/loading.component';
import { AlertaComponent } from '../modules/shared/alerta/alerta.component';
import { AlertaTypes } from '../modules/shared/alerta/alertaTypes';
import { ConfirmWindowComponent } from '../modules/shared/confirm-window/confirm-window.component';
import { Observable } from 'rxjs';
import { FormNovoComponent } from '../modules/financeiro/lancamentos/form-novo/form-novo.component';
import { ContaOUT } from 'src/dominio/core/service/ports/io/conta_IO';
import { EmpresaOUT } from 'src/dominio/core/service/ports/io/empresa_IO';
import { FormEditarComponent } from '../modules/financeiro/lancamentos/form-editar/form-editar.component';
import { LancamentoOUT } from 'src/dominio/core/service/ports/io/lancamento_IO';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalRef?: BsModalRef;

  constructor(private modalService: BsModalService) { }


  public openModalLoader(){
    this.modalRef = this.modalService.show(LoadingComponent, {backdrop: 'static', keyboard: false});
  }

  public openModalAlertaDanger(msg:string){
    this.close();
    this.modalRef = this.modalService.show(AlertaComponent);
    this.modalRef.content.msg = msg;
    this.modalRef.content.alertaType = AlertaTypes.Danger;
    this.modalRef.content.setModalRef(this.modalRef)
   
  }

  public openModalAlertaSucess(msg:string){
    this.close();
    this.modalRef = this.modalService.show(AlertaComponent);
    this.modalRef.content.msg = msg;
    this.modalRef.content.alertaType = AlertaTypes.Success;
    this.modalRef.content.setModalRef(this.modalRef)
    
  }

  public openModalConfirmWindow(msg:string): Observable<boolean> {
    this.modalRef = this.modalService.show(ConfirmWindowComponent);
    this.modalRef.content.msg = msg;
    this.modalRef.content.setModalRef(this.modalRef);
    return (this.modalRef.content as ConfirmWindowComponent).getNotificador();
  }

  public openModalNovoLancamento(empresa: EmpresaOUT, conta:ContaOUT){
    this.modalRef = this.modalService.show(FormNovoComponent); 
    this.modalRef.content.setEmpresa(empresa);
    this.modalRef.content.setConta(conta);
    this.modalRef.content.setModalRef(this.modalRef);
    return (this.modalRef.content as FormNovoComponent).getNotificador();
   
  }

  public openModalEditarLancamento(empresa: EmpresaOUT, lancamento:LancamentoOUT){
    this.modalRef = this.modalService.show(FormEditarComponent); 
    this.modalRef.content.setEmpresa(empresa);
    this.modalRef.content.setLancamento(lancamento);
    this.modalRef.content.setModalRef(this.modalRef);
    return (this.modalRef.content as FormEditarComponent).getNotificador();
   
  }

  public close(){
    this.modalRef?.hide();
  }

}
