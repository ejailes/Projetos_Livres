
import { Atualizar } from "./atualizar";
import { Deletar } from "./deletar";
import { cliente_novo } from "./novo";
import { PorID } from "./porId";
import { cliente_todosPorIDEmpresa } from "./todosPorIDEmpresa";

export namespace ClienteServices {
   
    export const todosPorIDEmpresa = cliente_todosPorIDEmpresa;
    export const novo = cliente_novo;
    export const porId = PorID.builder;
    export const atualizar = Atualizar.builder;
    export const deletar = Deletar.builder;
    
}   