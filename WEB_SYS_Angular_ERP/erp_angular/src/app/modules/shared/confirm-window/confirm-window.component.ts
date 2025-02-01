import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';
import { NotificacaoBooleanObserver } from 'src/adapted/notificacao/observer/notificacaoBooleanObserver';

@Component({
  selector: 'app-confirm-window',
  templateUrl: './confirm-window.component.html',
  styleUrls: ['./confirm-window.component.css']
})
export class ConfirmWindowComponent implements OnInit {

  private modalRef?:BsModalRef;
  private notificacao;
  public msg?:string;

  constructor() { 
    this.notificacao = new NotificacaoBooleanObserver(true);
  }

  ngOnInit(): void {

  } 

  public setModalRef(modalRef:BsModalRef){
    this.modalRef = modalRef;
  }

  public onConfirm(){
    this.notificacao.notificar();
    this.modalRef?.hide();
  }

  public getNotificador(){
    return this.notificacao.getNotificadorObserver().pipe(take(1));
  }

  public onDecline(){
    this.modalRef?.hide();
  }

}
