export interface Pagination<T> {

    setValue(value: T): void;
    getValue(): T;
    setPagina(pagina: number): void;
    getPagina(): number;
    getPaginas(): number[];
    getSize(): number;

    navPrevious():void;
    navNext():void;
    navPag(pagina: number):void;
    
}