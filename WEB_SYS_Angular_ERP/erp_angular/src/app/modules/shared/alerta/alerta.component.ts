import { Component, Input, OnInit } from '@angular/core';
import { AlertaTypes } from './alertaTypes';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit {

  @Input()
  public msg?: string;

  @Input()
  public alertaType: AlertaTypes = AlertaTypes.Success;
  private refModal?: any;

  constructor() { }

  ngOnInit(): void {
  }

  public setModalRef(modal: any) {
    this.refModal = modal;
  }

  public onCloseModal() {

    if (!this.refModal) {
      return;
    }
    
    this.refModal.hide();
  }

}
