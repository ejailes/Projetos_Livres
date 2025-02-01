import { TipoOperacaoEnum } from "../valueObject/tipoOperacao";

export class Lancamento {

    private id?: number;

    constructor(private idConta: number, private idCliente: number, private tipo: TipoOperacaoEnum,
        private descricao: string, private valor: number, private data: Date) {

    }

    public getId() {

        if (!this.id) {
            throw new Error("Lançamento sem ID");
        }

        return this.id;
    }

    public getIdConta() {

        return this.idConta;
    }

    public getIDCliente() {
        return this.idCliente;
    }

    public getTipoOperacao() {
        return this.tipo;
    }

    public getDescricao() {
        return this.descricao;
    }

    public getValor() {
        return this.valor;
    }

    public getData() {
        return this.data;
    }

    public setId(id: number) {
        this.id = id;

    }
}