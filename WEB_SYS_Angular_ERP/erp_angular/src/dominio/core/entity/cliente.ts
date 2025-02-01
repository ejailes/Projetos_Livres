export class Cliente {

    private id?: number;
    private id_empresa?: number;
    private tipo?: Cliente.Tipo;

    constructor(public nome: string, readonly cpf_cnpj: string) {
    }

    public setID(id: number) {
        this.id = id;
    }

    public setIDEmpresa(id: number) {
        this.id_empresa = id;
    }

    public setTipo(tipo: Cliente.Tipo) {
        this.tipo = tipo;
    }

    public getID(): number {
        if (!this.id) {
            throw new Error("Cliente sem ID");
        }

        return this.id;
    }

    public getIDEmpresa(): number {
        if (!this.id_empresa) {
            throw new Error("Cliente sem Empresa Associado");
        }

        return this.id_empresa;
    }

    public getTipo() {

        if (!this.tipo) {
            throw new Error("Cliente sem tipo Associado");
        }
        return this.tipo;
    }

}

export namespace Cliente {
    export enum Tipo {
        PF = "Pessoa Física",
        PJ = "Pessoa Jurídica"
    }
}