import { Cliente } from "src/dominio/core/entity/cliente"
import { EmpresaOUT } from "./empresa_IO"

export interface ClienteIN {

    setEmpresa(empresa: EmpresaOUT): void
    setNome(nome: string): void
    setCpf_Cnpj(cpf_cnpj: string): void
    setTipo(tipo: string): void

    getEmpresa(): EmpresaOUT
    getNome(): string
    getCpf_Cnpj(): string
    getTipo(): Cliente.Tipo
}

export interface ClienteOUT {

    setNome(nome: string): void
    setCpf_Cnpj(cpf_cnpj: string): void
    setTipo(tipo: string): void

    getID():number
    getIDEmpresa(): number
    getCpf_Cnpj(): string
    getNome():string
    getTipo(): Cliente.Tipo
}