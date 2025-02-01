import { Atualizar } from "./atualizar";
import { DeletarPorId } from "./deletarPorId";
import { DeletarTodosPorCliente } from "./deletarTodosPorCliente";
import { DeletarTodosPorConta } from "./deletarTodosPorConta";
import { Novo } from "./novo";
import { PesquisaLazy } from "./pesquisaLazy";
import { PesquisaLazyPorPeriodo } from "./pesquisaLazyPorPeriodo";
import { Recentes } from "./recentes";
import { TodosPorIdConta } from "./todosPorIDConta";
 
export namespace LancamentoServices {
   
    export const novo = Novo.builder; 
    export const todosPorIdConta = TodosPorIdConta.builder; 
    export const deletarPorId = DeletarPorId.builder; 
    export const deletarTodosPorConta = DeletarTodosPorConta.builder;
    export const deletarTodosPorCliente = DeletarTodosPorCliente.builder;
    export const atualizar = Atualizar.builder;
    export const pesquisaLazy = PesquisaLazy.builder;
    export const pesquisaLazyPorPeriodo = PesquisaLazyPorPeriodo.builder;
    export const recentes = Recentes.builder;
     
}  