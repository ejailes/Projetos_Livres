import { Empresa } from "../entity/empresa";

export interface Empresas {

    nova(empresa:Empresa):void;
    atualizar(empresa:Empresa):void;
    deletarPorCnpj(cnpj:string):void;
    buscarPorCnpj(cnpj:string):Empresa;
    buscarPorId(id:number):Empresa;
    todas():Empresa[];
    todasPorEmailDoUsuario(email:string):Empresa[];
}