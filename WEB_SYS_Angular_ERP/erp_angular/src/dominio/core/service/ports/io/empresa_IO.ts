import { UsuarioOUT } from "./usuario_IO";
import { EnderecoIN, EnderecoOUT } from "./endereco_IO";

export interface EmpresaIN {

    readonly tipo: TipoEmpresaEnum.IN_EMPRESA;

    setNome(nome:string):void;
    setCnpj(cnpj:string):void;
    setUsuario(usuario:UsuarioOUT):void;
    setEndereco(endereco:EnderecoIN):void;

    getNome():string;
    getCnpj():string;
    getUsuario():UsuarioOUT;
    getEndereco():EnderecoIN;

}

export interface EmpresaOUT {
    
    readonly tipo: TipoEmpresaEnum.OUT_EMPRESA;

    setId(id:number):void;
    setNome(nome:string):void;
    setCnpj(cnpj:string):void;
    setIDUsuario(idUsuario:string):void;
    setEndereco(endereco:EnderecoOUT):void;

    getId():number;
    getNome():string;
    getCnpj():string;
    getEndereco():EnderecoOUT;
    getIDUsuario():string;

}

export enum TipoEmpresaEnum {
    IN_EMPRESA,
    OUT_EMPRESA 
}