import { Observable, Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { NotificacaoObserver } from "./notificacaoObserver";
import { NotificacaoEnum } from "./notificacaoEnum";

export class NotificacaoObserverTimeout implements NotificacaoObserver<any, Observable<any>>{

    private sujectNotificacao: Subject<undefined>;
    private value?:any;

    constructor(private timeout: number) {
        this.sujectNotificacao = new Subject();
    }

    getNotificadorObserver(): Observable<any> {
        return this.sujectNotificacao.asObservable().pipe(debounceTime(this.timeout));
    }

    updateValue(value: any): void {
        this.value = value;
    }

    getValue() {
        this.value;
    }

    notificar(): void {
        this.sujectNotificacao.next(this.value);
    }

    getName(): NotificacaoEnum {
        return NotificacaoEnum.TimeOut_Observer;
    }

}