import { empresa_atualizar } from "./atualizar";
import { empresa_deletar } from "./delete";
import { empresa_nova } from "./nova";
import { empresa_pesquisarPorCNPJ } from "./pesquisarPorCNPJ";
import { empresa_pesquisarPorID } from "./pesquisarPorID";
import { empresa_todasPorEmailDoUsuario } from "./todasPorEmaildoUsuario";

export namespace EmpresaServices {
   
    export const atualizar = empresa_atualizar;
    export const nova = empresa_nova;
    export const deletar = empresa_deletar;
    export const pesquisarPorCNPJ = empresa_pesquisarPorCNPJ;
    export const pesquisarPorID = empresa_pesquisarPorID;
    export const todasPorEmailUsuario = empresa_todasPorEmailDoUsuario;
    
}  