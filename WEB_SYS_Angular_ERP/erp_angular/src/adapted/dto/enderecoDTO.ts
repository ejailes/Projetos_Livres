import { EnderecoIN, EnderecoOUT, TipoEnderecoEnum } from "src/dominio/core/service/ports/io/endereco_IO";


export class EnderecoINImpl implements EnderecoIN {

    private numero?: string;
    readonly tipo = TipoEnderecoEnum.IN_ENDERECO;

    constructor(private cep: string, private logradouro: string,
        private bairro: string, private cidade: string, private uf: string) {

    }

    getIdEmpresa(): number {
        return 0;
    }

    setNumero(numero: string) {
        this.numero = numero;
    }

    getCep(): string {
        return this.cep;
    }
    getNumero(): string {
        if (!this.numero) {
            throw new Error("Endereço sem Numero");
        }
        return this.numero;
    }
    getLogradouro(): string {
        return this.logradouro;
    }
    getBairro(): string {
        return this.bairro;
    }
    getCidade(): string {
        return this.cidade;
    }
    getUf(): string {
        return this.uf;
    }

}

export class EnderecoOUTImpl implements EnderecoOUT {

    readonly tipo = TipoEnderecoEnum.OUT_ENDERECO;
    private cep?: string;
    private numero?: string;
    private logradouro?: string;
    private bairro?: string;
    private cidade?: string;
    private uf?: string;

    constructor(private id: number, private id_empresa: number) {
    }

    setCep(cep: string): void {
        this.cep = cep;
    }
    setNumero(numero: string): void {
        this.numero = numero;
    }
    setLogradouro(logradouro: string): void {
        this.logradouro = logradouro;
    }
    setBairro(bairro: string): void {
        this.bairro = bairro;
    }
    setCidade(cidade: string): void {
        this.cidade = cidade;
    }
    setUf(uf: string): void {
        this.uf = uf;
    }

    getId(): number {
        return this.id;
    }
    getIdEmpresa(): number {
        return this.id_empresa;
    }

    getCep(): string {

        if (!this.cep) {
            throw new Error("Não existe CEP");
        }

        return this.cep;
    }
    getNumero(): string {
        if (!this.numero) {
            throw new Error("Não existe Numero");
        }

        return this.numero;
    }
    getLogradouro(): string {
        if (!this.logradouro) {
            throw new Error("Não existe Logradouro");
        }

        return this.logradouro;
    }
    getBairro(): string {
        if (!this.bairro) {
            throw new Error("Não existe Bairro");
        }

        return this.bairro;
    }
    getCidade(): string {
        if (!this.cidade) {
            throw new Error("Não existe Cidade");
        }

        return this.cidade;
    }
    getUf(): string {
        if (!this.uf) {
            throw new Error("Não existe UF");
        }

        return this.uf;
    }

}