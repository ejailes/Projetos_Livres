import { TipoOperacaoEnum } from "src/dominio/core/valueObject/tipoOperacao"
import { ClienteOUT } from "./cliente_IO"
import { ContaOUT } from "./conta_IO"

export interface LancamentoIN {

    readonly tipo: TipoLancamentoEnum.IN_LANCAMENTO;

    setConta(conta: ContaOUT): void
    setCliente(cliente: ClienteOUT): void
    setTipoOperacao(tipoOperacao: string): void
    setDescricao(descricao: string): void
    setValor(valor:number):void
    setData(data:Date):void; 

    getConta(): ContaOUT
    getCliente(): ClienteOUT
    getTipoOperacao(): TipoOperacaoEnum
    getDescricao(): string
    getValor(): number
    getData():Date

}

export interface LancamentoOUT {

    readonly tipo: TipoLancamentoEnum.OUT_LANCAMENTO;

    setClienteOUT(cliente:ClienteOUT): void;
    setDescricao(descricao:string): void
    setValor(valor:number): void
    setTipoOperacao(operacao:string): void
    setData(data:Date):void

    getId(): number;
    getIdConta(): number;

    getClienteOUT(): ClienteOUT;
    getTipoOperacao(): string
    getDescricao(): string
    getValor(): string
    getData():Date
}

export enum TipoLancamentoEnum {
    IN_LANCAMENTO,
    OUT_LANCAMENTO
}