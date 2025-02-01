import { ContaIN, ContaOUT } from "src/dominio/core/service/ports/io/conta_IO";
import { EmpresaOUT } from "src/dominio/core/service/ports/io/empresa_IO";
import { NumeroConta } from "src/dominio/core/valueObject/numeroConta";

export class ContaINImpl implements ContaIN {

    private nomeBanco?: string;
    private numAgencia?: number;
    private numConta?: NumeroConta;
    private tipoConta?: string;

    constructor(private empresa: EmpresaOUT) {
        this.setEmpresa(empresa);
    }

    setEmpresa(empresa: EmpresaOUT): void {
        this.empresa = empresa;
    }
    setNomeBanco(nomeBanco: string): void {
        this.nomeBanco = nomeBanco;
    }
    setNumAgencia(numAgencia: number): void {
        this.numAgencia = numAgencia;
    }
    setConta(numConta: NumeroConta): void {
        this.numConta = numConta;
    }
    setTipoConta(tipoConta: string): void {
        this.tipoConta = tipoConta;
    }

    getEmpresa(): EmpresaOUT {
        return this.empresa;
    }
    getNomeBanco(): string {
        if (!this.nomeBanco) {
            throw new Error("Conta sem Nome de Banco");
        }
        return this.nomeBanco;
    }
    getNumAgencia(): number {
        if (!this.numAgencia) {
            throw new Error("Conta sem Agência");
        }
        return this.numAgencia;
    }
    getConta(): NumeroConta {
        if (!this.numConta) {
            throw new Error("Conta sem Numero");
        }
        return this.numConta;
    }
    getTipoConta(): string {
        if (!this.tipoConta) {
            throw new Error("Conta sem tipo");
        }
        return this.tipoConta;
    }

}

export class ContaOUTImpl implements ContaOUT {

    private id_empresa: number = 0;
    private nomeBanco?: string;
    private numAgencia?: number;
    private numConta?: NumeroConta;
    private tipoConta?: string;

    constructor(private id: number) {
        this.setId(id);
    }

    setId(id: number): void {
        this.id = id;
    }

    setIdEmpresa(id_empresa: number): void {
        this.id_empresa = id_empresa;
    }
    
    setNomeBanco(nomeBanco: string): void {
        this.nomeBanco = nomeBanco;
    }

    setNumAgencia(numAgencia: number): void {
        this.numAgencia = numAgencia;
    }

    setConta(numConta: NumeroConta): void {
        this.numConta = numConta;
    }

    setTipoConta(tipoConta: string): void {
        this.tipoConta = tipoConta;
    }

    getId(): number {
        return this.id;
    }

    getIdEmpresa(): number {
        
        if (this.id_empresa < 0) {
            throw new Error("Conta sem Empresa associada");
        }

        return this.id_empresa;
    }

    getNomeBanco(): string {
        if (!this.nomeBanco) {
            throw new Error("Conta sem Nome de Banco");
        }
        return this.nomeBanco;
    }

    getNumAgencia(): number {
        if (!this.numAgencia) {
            throw new Error("Conta sem Agência");
        }
        return this.numAgencia;
    }

    getConta(): NumeroConta {
        if (!this.numConta) {
            throw new Error("Conta sem Numero");
        }
        return this.numConta;
    }

    getTipoConta(): string {
        if (!this.tipoConta) {
            throw new Error("Conta sem tipo");
        }
        return this.tipoConta;
    }

}