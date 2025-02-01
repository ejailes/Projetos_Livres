import { Endereco } from "../entity/endereco";

export interface Enderecos {

    novo(endereco:Endereco):void;
    atualizar(endereco:Endereco):void;
    todos():Endereco[];
    deletarPorIdEmpresa(id:number): void;
    porIdDaEmpresa(id:number):Endereco;

}