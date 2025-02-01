import { NumeroConta } from "src/dominio/core/valueObject/numeroConta";
import { EmpresaOUT } from "./empresa_IO";

export interface ContaIN {

    setEmpresa(empresa: EmpresaOUT): void
    setNomeBanco(nomeBanco: string): void
    setNumAgencia(numAgencia: number): void
    setConta(numConta: NumeroConta): void
    setTipoConta(tipoConta: string): void

    getEmpresa(): EmpresaOUT
    getNomeBanco(): string
    getNumAgencia(): number
    getConta(): NumeroConta
    getTipoConta(): string

}

export interface ContaOUT {

    setId(id: number): void;
    setIdEmpresa(id_empresa: number): void
    setNomeBanco(nomeBanco: string): void
    setNumAgencia(numAgencia: number): void
    setConta(numConta: NumeroConta): void
    setTipoConta(tipoConta: string): void

    getId(): number;
    getIdEmpresa(): number
    getNomeBanco(): string
    getNumAgencia(): number
    getConta(): NumeroConta
    getTipoConta(): string

}