import { Injectable } from '@angular/core';
import { ConverterFactoryImpl } from 'src/adapted/converters/converterFactoryImpl';
import { RepositoryFactoryLocalStorage } from 'src/adapted/repository/local/repositoryFactoryLocalStorage';
import { LancamentoController } from 'src/dominio/controller/lancamentoController';
import { ClienteOUT } from 'src/dominio/core/service/ports/io/cliente_IO';
import { ContaOUT } from 'src/dominio/core/service/ports/io/conta_IO';
import { LancamentoIN, LancamentoOUT } from 'src/dominio/core/service/ports/io/lancamento_IO';
import { Pagination } from 'src/dominio/core/service/ports/io/pagination_IO';
import { IntervaloData } from 'src/dominio/core/valueObject/intervaloDada';
import { ConverterFactory } from 'src/dominio/factories/converterFactory';
import { RepositoryFactory } from 'src/dominio/factories/repositoryFactory';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private lancamentoController: LancamentoController;

  constructor() {

    let repository: RepositoryFactory = new RepositoryFactoryLocalStorage();
    let converters: ConverterFactory = new ConverterFactoryImpl();
    this.lancamentoController = new LancamentoController(repository, converters);

  }

  public novo(lancamento: LancamentoIN) {
    this.lancamentoController.novo(lancamento);
  }

  public atualizar(lancamento: LancamentoOUT) {
    this.lancamentoController.atualizar(lancamento);
  }

  public todosPorIdConta(conta: ContaOUT) {
    return this.lancamentoController.todosPorIdConta(conta);
  }

  public buscarPorPeriodo(conta: ContaOUT, pagination: Pagination<LancamentoOUT[]>, periodo:IntervaloData) {
    return this.lancamentoController.buscarPorPeriodo(conta, pagination, periodo);
  }

  public buscaPaginada(conta: ContaOUT, pagination: Pagination<LancamentoOUT[]>) {
    return this.lancamentoController.buscaPaginada(conta, pagination);
  }

  public recentes(conta: ContaOUT) {
    return this.lancamentoController.recentes(conta);
  }

  public deletarPorId(lancamento: LancamentoOUT) {
    return this.lancamentoController.deletarPorId(lancamento);
  }

  public deletarTodosPorConta(conta: ContaOUT) {
    return this.lancamentoController.deletarTodosPorConta(conta);
  } 

  public deletarTodosPorCliente(cliente: ClienteOUT) {
    return this.lancamentoController.deletarTodosPorCliente(cliente);
  }
  
}
