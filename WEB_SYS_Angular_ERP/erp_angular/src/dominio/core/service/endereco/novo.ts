import { Enderecos } from "../../repository/enderecos";
import { EnderecoConverter } from "../ports/converters/enderecoConverter";
import { EmpresaOUT } from "../ports/io/empresa_IO";
import { EnderecoIN } from "../ports/io/endereco_IO";
import { Service } from "../service";

type NovoType = Omit<Novo, "execute">;

class Novo implements Service<void> {

    private endereco?: EnderecoIN;
    private empresa?: EmpresaOUT;

    private constructor(private repoEnderecos: Enderecos, private converter:EnderecoConverter) {

    }

    public setEmpresa(empresa:EmpresaOUT){
        this.empresa = empresa;
        return this as NovoType;
    }

    public setEndereco(endereco:EnderecoIN){
        this.endereco = endereco;
        return this as NovoType;
    }

    public create(): Service<void>{
        return this;
    }

    execute(): void {

        if (!this.endereco) {
            throw new Error("Não existe endereço para salvar!!!");
        }

        if (!this.empresa) {
            throw new Error("Não existe Empresa a associado para salvar o endereço!!!");
        }

        let endereco = this.converter.toEndereco(this.endereco, this.empresa);
        this.repoEnderecos.novo(endereco); 
    }

    public static builder(repoEnderecos: Enderecos, converter:EnderecoConverter){
        return new Novo(repoEnderecos, converter) as NovoType;
    }

}

export const endereco_novo = Novo.builder;