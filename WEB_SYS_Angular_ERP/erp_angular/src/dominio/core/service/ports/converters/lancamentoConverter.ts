import { Lancamento } from "src/dominio/core/entity/lancamento";
import { LancamentoIN, LancamentoOUT } from "../io/lancamento_IO";

export interface LancamentoConverter {

    toLancamento(lancamento: LancamentoIN): Lancamento;
    toLancamento(lancamento: LancamentoOUT): Lancamento;
    toListLancamentoOUT(lancamentos: Lancamento[]): LancamentoOUT[];
    toLancamentoOUT(lancamento:Lancamento):LancamentoOUT;

}