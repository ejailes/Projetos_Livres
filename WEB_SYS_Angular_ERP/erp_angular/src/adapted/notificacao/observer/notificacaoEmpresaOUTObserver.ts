import { Observable, Subject } from "rxjs";
import { NotificacaoObserver } from "./notificacaoObserver";
import { NotificacaoEnum } from "./notificacaoEnum";
import { EmpresaOUT } from "src/dominio/core/service/ports/io/empresa_IO";

export class notificacaoEmpresaOUTObserver implements NotificacaoObserver<EmpresaOUT, Observable<EmpresaOUT>> {

    private sujectNotificacao: Subject<EmpresaOUT> = new Subject();

    constructor(private empresa: EmpresaOUT) {

    }

    notificar(): void {
        this.sujectNotificacao.next(this.empresa);
    }

    updateValue(value: EmpresaOUT): void {
        this.empresa = value;
    }

    getNotificadorObserver(): Observable<EmpresaOUT> {
        return this.sujectNotificacao.asObservable();
    }


    getValue(): EmpresaOUT {
        return this.empresa;
    }

    getName(): NotificacaoEnum {
        return NotificacaoEnum.Empresa_Observer;
    }

}