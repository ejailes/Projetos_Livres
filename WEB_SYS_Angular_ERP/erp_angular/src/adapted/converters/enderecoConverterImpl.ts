import { Endereco } from "src/dominio/core/entity/endereco";
import { EmpresaOUT } from "src/dominio/core/service/ports/io/empresa_IO";
import { EnderecoOUTImpl } from "../dto/enderecoDTO";
import { EnderecoIN, EnderecoOUT, TipoEnderecoEnum } from "src/dominio/core/service/ports/io/endereco_IO";
import { EnderecoConverter } from "src/dominio/core/service/ports/converters/enderecoConverter";

export class EnderecoConverterImpl implements EnderecoConverter {
    
    public toEndereco(endereco: EnderecoOUT): Endereco
    public toEndereco(endereco: EnderecoIN, empresa?: EmpresaOUT): Endereco
    public toEndereco(endereco: any, empresa?: EmpresaOUT): Endereco {

        if (endereco.tipo === TipoEnderecoEnum.IN_ENDERECO) {

            let enderecoIN = new Endereco();
            enderecoIN.cep = endereco.getCep();
            enderecoIN.cidade = endereco.getCidade();
            enderecoIN.numero = endereco.getNumero();
            enderecoIN.logradouro = endereco.getLogradouro();
            enderecoIN.bairro = endereco.getBairro();
            enderecoIN.uf = endereco.getUf();

            if (empresa) {
                enderecoIN.setIdEmpresa(empresa.getId());
            }

            return enderecoIN;
        }

        if (endereco.tipo === TipoEnderecoEnum.OUT_ENDERECO) {

            let enderecoOUT = new Endereco();
            enderecoOUT.setId(endereco.getId());
            enderecoOUT.setIdEmpresa(endereco.getIdEmpresa());
            enderecoOUT.cep = endereco.getCep();
            enderecoOUT.cidade = endereco.getCidade();
            enderecoOUT.numero = endereco.getNumero();
            enderecoOUT.logradouro = endereco.getLogradouro();
            enderecoOUT.bairro = endereco.getBairro();
            enderecoOUT.uf = endereco.getUf();

            return enderecoOUT;
        }

        throw new Error("Não foi possível conveter o Endereco");

    }

    public toEnderecoOUT(endereco: Endereco): EnderecoOUT {

        let enderecoOUT: EnderecoOUT = new EnderecoOUTImpl(endereco.getId(), endereco.getIdEmpresa());
        enderecoOUT.setCep(endereco.cep);
        enderecoOUT.setBairro(endereco.bairro);
        enderecoOUT.setCidade(endereco.cidade);
        enderecoOUT.setLogradouro(endereco.logradouro);
        enderecoOUT.setNumero(endereco.numero);
        enderecoOUT.setUf(endereco.uf);

        return enderecoOUT;
    }

}