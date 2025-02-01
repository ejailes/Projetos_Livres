import { Conta } from "src/dominio/core/entity/conta"
import { ContaIN, ContaOUT } from "../io/conta_IO"

export interface ContaConverter {
    
    toConta(conta: ContaIN): Conta
    toContaOUT(conta: Conta): ContaOUT
    toListContaOUT(contas: Conta[]): ContaOUT[]
}