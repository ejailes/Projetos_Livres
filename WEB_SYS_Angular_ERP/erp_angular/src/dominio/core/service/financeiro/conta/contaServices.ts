import { conta_deletarPorID } from "./deletarContaPorID";
import { conta_nova } from "./nova";
import { PesquisarPorID } from "./pesquisarPorID";
import { conta_todasPorIDEmpresa } from "./todasPorIDEmpresa";

export namespace ContaServices {
   
    export const nova = conta_nova;
    export const deletar = conta_deletarPorID;
    export const todasPorIDEmpresa = conta_todasPorIDEmpresa;
    export const pesquisarPorID = PesquisarPorID.builder;
    
}  