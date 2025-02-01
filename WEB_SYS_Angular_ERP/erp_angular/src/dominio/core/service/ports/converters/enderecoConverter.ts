import { Endereco } from "src/dominio/core/entity/endereco"
import { EmpresaOUT } from "../io/empresa_IO"
import { EnderecoIN, EnderecoOUT } from "../io/endereco_IO"

export interface EnderecoConverter {

    toEndereco(endereco: EnderecoOUT): Endereco
    toEndereco(endereco: EnderecoIN, empresa?: EmpresaOUT): Endereco
    toEndereco(endereco: any, empresa?: EmpresaOUT): Endereco
    toEnderecoOUT(endereco: Endereco): EnderecoOUT
} 