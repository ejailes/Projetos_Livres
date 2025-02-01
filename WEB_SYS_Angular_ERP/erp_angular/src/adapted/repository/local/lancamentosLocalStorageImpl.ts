import { OperacaoTipo } from "src/adapted/utils/operacaoTipo";
import { Lancamento } from "src/dominio/core/entity/lancamento";
import { Lancamentos } from "src/dominio/core/repository/lancamentos";
import { IntervaloData } from "src/dominio/core/valueObject/intervaloDada";
import { TipoOperacaoEnum } from "src/dominio/core/valueObject/tipoOperacao";

export class LancamentosLocalStorageImpl implements Lancamentos {

    private storage: Storage;

    constructor() {
        this.storage = window.localStorage;
    }
 
    novo(lancamento: Lancamento): void {

        this.checkStorage();

        let lancamentos = this.gerarId(lancamento);
        this.setLocalStorage(lancamentos);
    }

    private gerarId(lancamento: Lancamento): Lancamento[] {

        let lancamentos = this.todos();
        if (lancamentos.length < 1) {
            lancamento.setId(1);
            lancamentos.push(lancamento);

        } else {

            let lastId = lancamentos.slice(-1)[0].getId();
            lancamento.setId(lastId + 1);
            lancamentos.push(lancamento);
        }

        return lancamentos;
    }

    private checkStorage() {
        if (!this.storage) {
            throw new Error("Navegador não suporta gravação Storage!");
        }
    }

    private setLocalStorage(lancamentos: Lancamento[]) {
        this.storage.setItem("erp.angular.db.financeiro.lancamentos", JSON.stringify(lancamentos));
    }

    atualizar(lancamentoNew: Lancamento): void {

        this.checkStorage();

        let lancamentos = this.todos().map(lancamento => {

            if (lancamento.getId() == lancamentoNew.getId()) {

                let lancamentoEdit = new Lancamento(lancamentoNew.getIdConta(), lancamentoNew.getIDCliente(),
                    lancamentoNew.getTipoOperacao(), lancamentoNew.getDescricao(),
                    lancamentoNew.getValor(), lancamentoNew.getData());

                lancamentoEdit.setId(lancamentoNew.getId());

                return lancamentoEdit;
            }

            return lancamento;
        });

        this.setLocalStorage(lancamentos);
    }

    todosPorIdConta(idConta: number): Lancamento[] {

        let lancamentos: Lancamento[] = [];
        lancamentos = this.todos()
            .filter(lancamento => lancamento.getIdConta() == idConta)
            .map((lancamento) => lancamento);

        return lancamentos;
    }

    buscarPorIntervaloData(idConta: number, intervalo: IntervaloData): Lancamento[] {

        const lancamentosPorPeriodo = this.todosPorIdConta(idConta).filter((lancamento) => {
            return (lancamento.getData() >= intervalo.getDataInit()) && (lancamento.getData() <= intervalo.getDataFim());
        });

        return lancamentosPorPeriodo;
    }

    todos(): Lancamento[] {

        let lancamentos: Lancamento[] = [];
        let lista = this.storage.getItem("erp.angular.db.financeiro.lancamentos");
        if (!lista) {
            return lancamentos;
        }

        let lancamentosTemp = JSON.parse(lista);
        for (let lancamento of lancamentosTemp) {

            const operacao = OperacaoTipo.check(lancamento.tipo);
            const data = new Date(lancamento.data);
            if (!operacao) {
                throw new Error("Operação Inválida");
            }

            let lancamentoTemp = new Lancamento(lancamento.idConta, lancamento.idCliente, TipoOperacaoEnum[operacao], lancamento.descricao, lancamento.valor, data);
            lancamentoTemp.setId(lancamento.id);
            lancamentos.push(lancamentoTemp);
        }

        return lancamentos;
    }

    buscarPorId(id: number): Lancamento {

        const lancamentos = this.todos();

        for (let lancamento of lancamentos) {
            if (lancamento.getId() == id) {
                return lancamento;
            }
        }

        throw new Error(`Lançamento com ID: ${id} não encontrada`);
    }

    recentes(idConta: number): Lancamento[] {

        let lancamentosRencentes:Lancamento[] = [];

        const lancamentos:Lancamento[] = this.todosPorIdConta(idConta);
        let lancamento = lancamentos.pop();
        if (lancamento) {
            lancamentosRencentes.push(lancamento);

        }

        return lancamentosRencentes;
    }


    excluir(id: number): void {

        this.buscarPorId(id);
        let lancamentos = this.todos().filter(lancamento => lancamento.getId() !== id).map(lancamento => lancamento);
        this.setLocalStorage(lancamentos);
    }

    excluirTodosPorConta(idConta: number): void {
        
        let lancamentos = this.todos().filter(lancamento => lancamento.getIdConta() !== idConta).map(lancamento => lancamento);
        this.setLocalStorage(lancamentos);
    } 

    excluirTodosPorCliente(idCliente: number): void {

        let lancamentos = this.todos().filter(lancamento => lancamento.getIDCliente() !== idCliente).map(lancamento => lancamento);
        this.setLocalStorage(lancamentos);
    }

}