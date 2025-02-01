import { Injectable } from '@angular/core';
import { ConverterFactoryImpl } from 'src/adapted/converters/converterFactoryImpl';
import { RepositoryFactoryLocalStorage } from 'src/adapted/repository/local/repositoryFactoryLocalStorage';
import { ClienteController } from 'src/dominio/controller/clienteController';
import { ClienteIN, ClienteOUT } from 'src/dominio/core/service/ports/io/cliente_IO';
import { EmpresaOUT } from 'src/dominio/core/service/ports/io/empresa_IO';
import { ConverterFactory } from 'src/dominio/factories/converterFactory';
import { RepositoryFactory } from 'src/dominio/factories/repositoryFactory';
import { LancamentoService } from './lancamento.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clienteController: ClienteController;

  constructor(private router: Router) {
    let repository: RepositoryFactory = new RepositoryFactoryLocalStorage();
    let converters: ConverterFactory = new ConverterFactoryImpl();
    this.clienteController = new ClienteController(repository, converters);
  }

  public novo(cliente: ClienteIN): void {

    try {
      this.clienteController.novo(cliente);
    } catch (error) {
      throw error;
    }
  }

  public todosPorEmpresa(empresa: EmpresaOUT): ClienteOUT[] {

    try {
      return this.clienteController.todosPorEmpresa(empresa);
    } catch (error) {
      throw error;
    }

  }

  public atualizar(cliente: ClienteOUT): void {

    try {
      return this.clienteController.atualizar(cliente);
    } catch (error) {
      throw error;
    }

  }

  public deletar(cliente: ClienteOUT, lancamentoService: LancamentoService): void {

    try {

      lancamentoService.deletarTodosPorCliente(cliente);
      this.clienteController.deletar(cliente.getID());

    } catch (error) {
      throw error;
    }

  }

  public deletarTodosPorEmpresa(empresa: EmpresaOUT, lancamentoService: LancamentoService): void {

    try {

      const clientes: ClienteOUT[] = this.todosPorEmpresa(empresa);
      clientes.forEach((cliente) => {
        this.deletar(cliente, lancamentoService);
      });

    } catch (error) {
      throw error;
    }

  }

  public porId(id: number): ClienteOUT {

    try {
      return this.clienteController.porId(id);
    } catch (error) {
      this.router.navigate(['empresas']);
      throw error;
    }
 
  }

}
