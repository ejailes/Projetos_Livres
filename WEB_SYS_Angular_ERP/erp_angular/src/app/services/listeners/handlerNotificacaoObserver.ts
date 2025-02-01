import { Observable } from "rxjs";
import { NotificacaoObserver } from "src/adapted/notificacao/observer/notificacaoObserver";

export class HandlerNotificacaoObserver<T, K extends Observable<T>> {

    constructor(private notificacao: NotificacaoObserver<T, K>) {
        this.setValue(this.notificacao.getValue());
    }
 
    public setValue(value: T) {
        this.notificacao.updateValue(value);
    }
 
    public getValue() {
        return this.notificacao.getValue();
    }

    public getListiner() {
        return this.notificacao.getNotificadorObserver();
    }

    public notificar() {
        this.notificacao.notificar();
    }

}