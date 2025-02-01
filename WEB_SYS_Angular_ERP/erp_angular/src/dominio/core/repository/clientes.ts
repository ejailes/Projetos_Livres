import { Cliente } from "../entity/cliente";

export interface Clientes { 

    novo(cliente:Cliente):void
    todasPorIDEmpresa(id:number):Cliente[]
    porId(id:number):Cliente
    atualizar(cliente:Cliente):void;
    excluir(idCliente:number):void;
    buscarPorCpfCnpj(cpf_cnpj:string): Cliente
    todos():Cliente[];

}