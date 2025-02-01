import { Lancamento } from "../entity/lancamento";
import { IntervaloData } from "../valueObject/intervaloDada";

export interface Lancamentos {

    novo(lancamento: Lancamento): void;
    atualizar(lancamento: Lancamento):void;
    todosPorIdConta(idConta: number): Lancamento[];
    buscarPorId(id:number):Lancamento;
    buscarPorIntervaloData(idConta: number, intervalo:IntervaloData): Lancamento[];
    recentes(idConta: number): Lancamento[];
    todos(): Lancamento[];
    excluir(id: number): void;
    excluirTodosPorConta(idConta: number): void;
    excluirTodosPorCliente(idCliente: number): void;
   
}