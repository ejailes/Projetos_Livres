import { Endereco } from "./endereco";

export class Empresa {

    private id?: number;
    private endereco?:Endereco;
    
    constructor(public nome: string, readonly cnpj: string, readonly emailUsuario: string) {

    }

    public setId(id: number) {
        this.id = id;
    }

    public setEndereco(endereco: Endereco) {
        this.endereco = endereco;
    }

    public geId(): number {
        if(!this.id){
            throw new Error("Empresa sem ID");
        }
        return this.id;
    }

    public geEndereco(): Endereco {
        if(!this.endereco){
            throw new Error("Empresa sem Endereço");
        }
        return this.endereco;
    }

}