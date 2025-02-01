import { Enderecos } from "../../repository/enderecos";
import { EnderecoConverter } from "../ports/converters/enderecoConverter";
import { EnderecoOUT } from "../ports/io/endereco_IO";
import { Service } from "../service";

type PorIdEmpresaType = Omit<PorIdEmpresa, "execute">;

class PorIdEmpresa implements Service<EnderecoOUT> {

    private id_empresa: number = 0;

    private constructor(private repoEnderecos: Enderecos, private converter:EnderecoConverter) {

    }

    public setIdEmpresa(id: number) {
        this.id_empresa = id;
        return this as PorIdEmpresaType;
    }

    private getEndereco(endereco: EnderecoOUT) {

        if (!endereco) {
            throw new Error("Não existe Endereço");
        }

        return endereco;
    }

    public create(): Service<EnderecoOUT>{
        return this;
    }

    execute(): EnderecoOUT { 

        if (this.id_empresa <= 0) {
            throw new Error("Adicione ID da empresa para a pesquisa!!!");
        }

        let endereco = this.repoEnderecos.porIdDaEmpresa(this.id_empresa);
        return this.getEndereco(this.converter.toEnderecoOUT(endereco));
   
    }

    public static builder(repoEnderecos: Enderecos, converter:EnderecoConverter){
        return new PorIdEmpresa(repoEnderecos, converter) as PorIdEmpresaType;
    }

}

export const endereco_porIDEmpresa = PorIdEmpresa.builder;