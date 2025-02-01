export class Endereco {

    private id?: number;
    private id_empresa?: number;
    public cep?: string;
    public numero?: string;
    public logradouro?: string;
    public bairro?: string;
    public cidade?: string;
    public uf?: string;

    constructor() {

    }

    public setId(id: number) {
        this.id = id;
    }

    public setIdEmpresa(id_empresa: number) {
        this.id_empresa = id_empresa;
    }

    public getId() {
        if (!this.id) {
            throw new Error("Endereço sem ID");
        }

        return this.id;
    }

    public getIdEmpresa() {
        if (!this.id_empresa) {
            throw new Error("Endereço sem ID de Empresa");
        }

        return this.id_empresa;
    }

}