import { HandlerNotificacao, Notificacao } from "src/dominio/core/service/notificacao";

export class HandlerNotificacaoImpl<T> implements HandlerNotificacao {

    constructor(public notificacao: Notificacao<T>) {
    }

    execute(): void {
        this.notificacao.notificar();
    }

}