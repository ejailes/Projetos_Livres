export interface HandlerNotificacao {
    execute(): void;
}

export interface Notificacao<T> {

    notificar(): void;
    updateValue(value: T): void;
    getValue(): T;
}