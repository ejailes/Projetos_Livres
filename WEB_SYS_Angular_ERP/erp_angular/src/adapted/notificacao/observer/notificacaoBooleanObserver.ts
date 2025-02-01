import { Observable, Subject } from "rxjs";
import { NotificacaoObserver } from "./notificacaoObserver";
import { NotificacaoEnum } from "./notificacaoEnum";

export class NotificacaoBooleanObserver implements NotificacaoObserver<boolean, Observable<boolean>> {

    private sujectNotificacao: Subject<boolean>;
    private value: boolean;

    constructor(value: boolean = false) {
        this.value = value;
        this.sujectNotificacao = new Subject();
    }

    notificar(): void {
        this.sujectNotificacao.next(this.value);
    }

    updateValue(value: boolean): void {
       this.value = value;
    }

    getValue(): boolean {
        return this.value;
    }

    getNotificadorObserver(): Observable<boolean> {
        return this.sujectNotificacao.asObservable();
    }

    getName(): NotificacaoEnum {
        return NotificacaoEnum.Boolean_Observer;
    }
}