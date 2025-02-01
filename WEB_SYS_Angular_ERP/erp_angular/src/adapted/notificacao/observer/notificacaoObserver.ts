import { Observable } from "rxjs";
import { Notificacao } from "src/dominio/core/service/notificacao";
import { NotificacaoEnum } from "./notificacaoEnum";

export interface NotificacaoObserver<T, K extends Observable<T>> extends Component, Notificacao<T> {

    getNotificadorObserver(): K;
} 

interface Component {

    getName(): NotificacaoEnum;
}