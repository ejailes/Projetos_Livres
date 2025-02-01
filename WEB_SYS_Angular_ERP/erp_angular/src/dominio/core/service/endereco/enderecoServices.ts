import { endereco_atualizar } from "./atualizar";
import { endereco_deletarPorIDEmpresa } from "./deletarPorIdEmpresa";
import { endereco_novo } from "./novo";
import { endereco_porIDEmpresa } from "./porIdEmpresa";

export namespace EnderecoServices {
   
    export const atualizar = endereco_atualizar;
    export const novo = endereco_novo;
    export const deletar = endereco_deletarPorIDEmpresa;
    export const pesquisarPorIDEmpresa = endereco_porIDEmpresa;
    
}   