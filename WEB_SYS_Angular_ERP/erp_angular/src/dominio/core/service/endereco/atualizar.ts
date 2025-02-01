import { Enderecos } from "../../repository/enderecos";
import { EnderecoConverter } from "../ports/converters/enderecoConverter";
import { EnderecoOUT } from "../ports/io/endereco_IO";
import { Service } from "../service";

type AtualizarType = Omit<Atualizar, "execute">;

class Atualizar implements Service<void> {

    private endereco?:EnderecoOUT;

    private constructor(private repoEnderecos:Enderecos, private converter:EnderecoConverter){

    }

    public setEndereco(endereco:EnderecoOUT){
        this.endereco = endereco;
        return this as AtualizarType;
    }

    public create(): Service<void>{
        return this;
    }

    execute(): void {
        if(!this.endereco){
            throw new Error("Não existe Endereço para atualizar!!!");
        }

        let endereco  = this.converter.toEndereco(this.endereco);
        this.repoEnderecos.atualizar(endereco);
    }

    public static builder(repoEnderecos:Enderecos, converter:EnderecoConverter){
        return new Atualizar(repoEnderecos, converter) as AtualizarType;
    }

}

export const endereco_atualizar = Atualizar.builder;