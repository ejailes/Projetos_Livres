import { NumeroConta } from "../valueObject/numeroConta";

export class Conta {

    private id?: number;
    private id_empresa: number = 0;

    constructor(private nomeBanco: string, private numAgencia: number,
        private numConta: NumeroConta, private tipoConta: string) {
    }

    public setId(id: number) {
        this.id = id;
    }

    public setIdEmpresa(id_empresa: number) {
        this.id_empresa = id_empresa;
    }

    public getId() {

        if (!this.id) {
            throw new Error("Conta sem ID");
        }

        return this.id;
    }

    public getIdEmpresa() {

        if (this.id_empresa <= 0) {
            throw new Error("Conta sem ID Empresa");
        }

        return this.id_empresa;
    }

    public getBanco() {
        return this.nomeBanco;
    }

    public getAgencia() {
        return this.numAgencia;
    }

    public getConta() {
        return this.numConta;
    }

    public getTipoConta() {
        return this.tipoConta;
    }
}