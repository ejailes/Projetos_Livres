import { Injectable } from '@angular/core';
import { HandlerNotificacaoObserver } from 'src/app/services/listeners/handlerNotificacaoObserver';
import { NotificacaoObserver } from 'src/adapted/notificacao/observer/notificacaoObserver';
import { Observable } from 'rxjs';

/* Essa classe é intermediadora de notificações, tem a funcionalidade de adicionar, executar
 e destruir notificações. O clico de vida dela se inicializa com o menu da aplicação. */

@Injectable({
  providedIn: 'root'
})
export class NotificacaoListenersService {

  private listernerMap: Map<KeysEnum, HandlerNotificacaoObserver<any, Observable<any>>>;

  constructor() {
    this.listernerMap = new Map();
  }

  private setListernerMap<T, K extends Observable<T>>(key: KeysEnum, notificacao: NotificacaoObserver<T, K>) {
    let handlerNotifica = new HandlerNotificacaoObserver(notificacao);
    this.listernerMap.set(key, handlerNotifica);
    return handlerNotifica;
  }

  public setNotificacao<T, K extends Observable<T>>(key: KeysEnum, notificacao: NotificacaoObserver<T, K>): HandlerNotificacaoObserver<any, Observable<any>> {
    return this.setListernerMap(key, notificacao)
  }

  public getNotificacao(key: KeysEnum) {
    return this.listernerMap.get(key);
  }

  public destroyNotificacao(key: KeysEnum) {
    this.listernerMap.delete(key);
  }
}

export enum KeysEnum {

  Menu = "Menu Home Observer",
  EmpresaOUT = "EmpresaOUT Observer",
  Time = "Time Observer"

}