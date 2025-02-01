import { ClienteOUT } from "src/dominio/core/service/ports/io/cliente_IO";
import { ContaOUT } from "src/dominio/core/service/ports/io/conta_IO";
import { LancamentoIN, LancamentoOUT, TipoLancamentoEnum } from "src/dominio/core/service/ports/io/lancamento_IO";
import { TipoOperacaoEnum } from "src/dominio/core/valueObject/tipoOperacao";
import { OperacaoTipo } from "../utils/operacaoTipo";

export class LancamentoINImpl implements LancamentoIN {

    private conta?: ContaOUT;
    private cliente?: ClienteOUT;
    private data?: Date;
    private tipoOperacao?: TipoOperacaoEnum;
    readonly tipo = TipoLancamentoEnum.IN_LANCAMENTO;

    constructor(private descricao: string, private valor: number, tipoOperacao: string) {
        this.setDescricao(descricao);
        this.setValor(valor);
        this.setTipoOperacao(tipoOperacao);
    }

    setConta(conta: ContaOUT): void {
        this.conta = conta;
    }

    setCliente(cliente: ClienteOUT): void {
        this.cliente = cliente;
    }

    setTipoOperacao(tipoOperacao: string): void {

        const operacao = OperacaoTipo.check(tipoOperacao);
        if (!operacao) {
            throw new Error("Operação Inválida");
        }

        this.tipoOperacao = TipoOperacaoEnum[operacao];
    }

    setDescricao(descricao: string): void {
        this.validatorDescricao(descricao);
        this.descricao = descricao;
    }

    private validatorDescricao(descricao: string) {
        console.log("validar descrição");
        if (descricao.length > 200) {
            throw new Error("Descrição deve conter menos de 200 letras");
        }
    }

    setValor(valor: number): void {
        this.validateValor(valor);
        this.valor = valor;
    }

    setData(data: Date): void {
        data.setHours(0, 0, 0, 0);
        this.validateDate(data);
        this.data = data;
    }

    private validateDate(data: Date) {
        
        const dataNow = new Date();
        dataNow.setHours(0, 0, 0, 0);

        if (data > dataNow) {
            throw new Error("A data informada e maior que a data de Hoje");
        }
    }

    private validateValor(valor: number) {
        if (valor <= 0) {
            throw new Error("O Valor dever ser maior que 0");
        }
    }

    getConta(): ContaOUT {

        if (!this.conta) {
            throw new Error("Lançamento sem Conta");
        }

        return this.conta;
    }

    getCliente(): ClienteOUT {

        if (!this.cliente) {
            throw new Error("Conta sem Cliente");
        }

        return this.cliente;
    }

    getTipoOperacao(): TipoOperacaoEnum {

        if (!this.tipoOperacao) {
            throw new Error("Conta sem Operação");
        }

        return this.tipoOperacao;
    }

    getDescricao(): string {

        if (!this.descricao) {
            throw new Error("Conta sem Descrição");
        }

        return this.descricao;
    }

    getValor(): number {

        if (this.valor < 0) {
            throw new Error("Valor deve ser maior que 0");
        }

        return this.valor;
    }

    getData(): Date {

        if (!this.data) {
            throw new Error("Conta sem data de lançamento");
        }

        return this.data;
    }

}

export class LancamentoOUTImpl implements LancamentoOUT {

    private cliente?: ClienteOUT;
    private descricao?: string;
    private valor?: string;
    private data?: Date;
    private operacao?: string;
    readonly tipo = TipoLancamentoEnum.OUT_LANCAMENTO;

    constructor(private id: number, private idConta: number) {

    }

    setClienteOUT(cliente: ClienteOUT): void {

        this.cliente = cliente;
    }

    setDescricao(descricao: string): void {
        this.descricao = descricao;
    }

    setValor(valor: number): void {
        this.validateValor(valor);
        this.valor = this.formartValor(valor);
    }

    private validateValor(valor: number) {
        if (valor <= 0) {
            throw new Error("O Valor dever ser maior que 0");
        }
    }

    private formartValor(valor: number) {

        const formatPrice = (amount: number): string => {
            return Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(amount);
        }

        return formatPrice(valor);
    }

    setTipoOperacao(operacao: string): void {
        this.operacao = operacao;
    }

    setData(data: Date): void {
        data.setHours(0, 0, 0, 0);
        this.validateDate(data);
        this.data = data;
    }

    private validateDate(data: Date) {
        const dataNow = new Date();
        dataNow.setHours(0, 0, 0, 0);

        if (data > dataNow) {
            throw new Error("A data informada e maior que a data de Hoje");
        }
    }

    getId(): number {
        return this.id;
    }

    getIdConta(): number {
        return this.idConta;
    }

    getClienteOUT(): ClienteOUT {

        if (!this.cliente) {
            throw new Error("Cliente não informando");
        }
        return this.cliente;
    }

    getTipoOperacao(): string {
        if (!this.operacao) {
            throw new Error("Operacao sem Tipo");
        }
        return this.operacao;
    }

    getDescricao(): string {
        if (!this.descricao) {
            throw new Error("Sem Descrição");
        }
        return this.descricao;
    }

    getValor(): string {

        if (!this.valor) {
            throw new Error("Sem Valor de lançamento");
        }
        return this.valor;
    }

    getData(): Date {
        if (!this.data) {
            throw new Error("Sem Data de lançamento");
        }
        return this.data;
    }
}