import { Conta } from "src/dominio/core/entity/conta";
import { Contas } from "src/dominio/core/repository/contas";
import { NumeroConta } from "src/dominio/core/valueObject/numeroConta";

export class ContasLocalStorageImpl implements Contas {

    private storage: Storage; 

    constructor() {
        this.storage = window.localStorage;
    }

    nova(conta: Conta): void {

        if (!this.storage) {
            throw new Error("Navegador não suporta gravação Storage!");
        }

        if (this.contaExist(conta)) {
            throw new Error(`A Conta de número ${conta.getConta().getNumeroContaComDigito()} já existe!`);
        }

        let contas = this.gerarId(conta);
        this.setLocalStorage(contas);
    }

    private contaExist(conta: Conta): boolean {
        try {
            this.buscarPorNumeroDeConta(conta.getConta().getNumeroConta());
            return true;
        } catch (error) {
            return false;
        }
    }

    private gerarId(conta: Conta): Conta[] {

        let contas = this.todas();
        if (contas.length < 1) {
            conta.setId(1);
            contas.push(conta);

        } else {

            let lastId = contas.slice(-1)[0].getId();
            conta.setId(lastId + 1);
            contas.push(conta);
        }

        return contas;
    }

    private setLocalStorage(contas: Conta[]) {
        this.storage.setItem("erp.angular.db.financeiro.contas", JSON.stringify(contas));
    }

    excluir(id: number): void {

        this.buscarPorId(id);
        let contas = this.todas().filter(conta => conta.getId() !== id).map(conta => conta);
        this.setLocalStorage(contas);
    } 

    buscarPorId(id: number): Conta {
       
        const contas = this.todas();

        for (let conta of contas) {
            if (conta.getId() == id) {
                return conta;
            }
        }

        throw new Error(`Conta com ID: ${id} não encontrada`);
    }

    buscarPorNumeroDeConta(numConta: string): Conta {

        let contaTemp: Conta | null = null;
        const contas = this.todas();

        for (let conta of contas) {
            if (conta.getConta().getNumeroConta() === numConta) {
                contaTemp = conta;
                break;
            }
        }

        if (!contaTemp) {
            throw new Error("Conta não encontrada");
        }

        return contaTemp;
    }

    todas(): Conta[] {

        let contas: Conta[] = [];
        let lista = this.storage.getItem("erp.angular.db.financeiro.contas");
        if (!lista) {
            return contas;
        }

        let contasTemp = JSON.parse(lista);
        for (let conta of contasTemp) {
            let numConta = new NumeroConta(conta.numConta.numero, conta.numConta.digite);

            let contaTemp = new Conta(conta.nomeBanco, conta.numAgencia,
                numConta, conta.tipoConta);

            contaTemp.setId(conta.id);
            contaTemp.setIdEmpresa(conta.id_empresa);
            contas.push(contaTemp);
        }

        return contas;
    }

    todasPorIdEmpresa(id: number): Conta[] {

        let contas: Conta[] = [];
        contas = this.todas()
            .filter(conta => conta.getIdEmpresa() == id)
            .map((conta) => conta);

        return contas;
    }

}