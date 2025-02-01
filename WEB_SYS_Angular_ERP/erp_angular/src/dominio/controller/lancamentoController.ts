import { Lancamentos } from "../core/repository/lancamentos";
import { LancamentoServices } from "../core/service/financeiro/lancamento/lancamentoService";
import { LancamentoConverter } from "../core/service/ports/converters/lancamentoConverter";
import { ClienteOUT } from "../core/service/ports/io/cliente_IO";
import { ContaOUT } from "../core/service/ports/io/conta_IO";
import { LancamentoIN, LancamentoOUT } from "../core/service/ports/io/lancamento_IO";
import { Pagination } from "../core/service/ports/io/pagination_IO";
import { IntervaloData } from "../core/valueObject/intervaloDada";
import { ConverterFactory } from "../factories/converterFactory";
import { RepositoryFactory } from "../factories/repositoryFactory";

export class LancamentoController {

    private repo: Lancamentos;
    private converter: LancamentoConverter;

    constructor(repo: RepositoryFactory, converters: ConverterFactory) {
        this.repo = repo.getRepositoryLancamentos();
        this.converter = converters.getConverterLancamento(repo, converters);
    }

    public novo(lancamento: LancamentoIN) {

        const service = LancamentoServices.novo(this.repo, this.converter)
            .setLancamento(lancamento)
            .create();

        service.execute();
    }

    public atualizar(lancamento: LancamentoOUT) {

        const service = LancamentoServices.atualizar(this.repo, this.converter)
            .setLancamento(lancamento)
            .create();

        service.execute();
    }

    public todosPorIdConta(conta: ContaOUT): LancamentoOUT[] {

        const service = LancamentoServices.todosPorIdConta(this.repo, this.converter)
            .setConta(conta)
            .create();

        return service.execute();
    }

    public recentes(conta: ContaOUT): LancamentoOUT[] {

        const service = LancamentoServices.recentes(this.repo, this.converter)
            .setConta(conta)
            .create();

        return service.execute();
    }

    public buscarPorPeriodo(conta: ContaOUT, pagination: Pagination<LancamentoOUT[]>, periodo: IntervaloData) {

        const service = LancamentoServices.pesquisaLazyPorPeriodo(this.repo, this.converter)
            .setConta(conta)
            .setPagination(pagination)
            .setPeriodo(periodo)
            .create();

        return service.execute();
    }


    public buscaPaginada(conta: ContaOUT, pagination: Pagination<LancamentoOUT[]>) {

        const service = LancamentoServices.pesquisaLazy(this.repo, this.converter)
            .setPagination(pagination)
            .setConta(conta)
            .create();

        return service.execute();
    }

    public deletarPorId(lancamento: LancamentoOUT): void {

        const service = LancamentoServices.deletarPorId(this.repo)
            .setLancamento(lancamento)
            .create();

        return service.execute();
    }

    public deletarTodosPorConta(conta: ContaOUT): void {

        const service = LancamentoServices.deletarTodosPorConta(this.repo)
            .setConta(conta)
            .create();

        return service.execute();
    }

    public deletarTodosPorCliente(cliente: ClienteOUT): void {

        const service = LancamentoServices.deletarTodosPorCliente(this.repo)
            .setId(cliente.getID())
            .create();

        service.execute();
    }
} 