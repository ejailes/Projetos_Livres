export interface EnderecoIN {

    readonly tipo: TipoEnderecoEnum.IN_ENDERECO;

    setNumero(numero:string):void;
    getIdEmpresa():number;
    getCep():string;
    getNumero():string;
    getLogradouro():string;
    getBairro():string;
    getCidade():string;
    getUf():string;

}

export interface EnderecoOUT {

    readonly tipo: TipoEnderecoEnum.OUT_ENDERECO;

    setCep(cep?:string):void;
    setNumero(numero?:string):void;
    setLogradouro(logradouro?:string):void;
    setBairro(bairro?:string):void;
    setCidade(cidade?:string):void;
    setUf(uf?:string):void;

    getId():number;
    getIdEmpresa():number;
    getCep():string;
    getNumero():string;
    getLogradouro():string;
    getBairro():string;
    getCidade():string;
    getUf():string;

}

export enum TipoEnderecoEnum {
    IN_ENDERECO,
    OUT_ENDERECO
}