import { Injectable } from '@angular/core';
import { ConverterFactoryImpl } from 'src/adapted/converters/converterFactoryImpl';
import { RepositoryFactoryLocalStorage } from 'src/adapted/repository/local/repositoryFactoryLocalStorage';
import { EnderecoController } from 'src/dominio/controller/enderecoController';
import { EmpresaOUT } from 'src/dominio/core/service/ports/io/empresa_IO';
import { EnderecoIN, EnderecoOUT } from 'src/dominio/core/service/ports/io/endereco_IO';
import { ConverterFactory } from 'src/dominio/factories/converterFactory';
import { RepositoryFactory } from 'src/dominio/factories/repositoryFactory';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private enderecoController: EnderecoController;

  constructor() {
    let repository: RepositoryFactory = new RepositoryFactoryLocalStorage();
    let converters: ConverterFactory = new ConverterFactoryImpl();
    this.enderecoController = new EnderecoController(repository, converters);
  }

  public novo(empresa: EmpresaOUT, endereco: EnderecoIN): void {
    this.enderecoController.novo(empresa, endereco);
  }

  public atualizar(endereco: EnderecoOUT): void {
    this.enderecoController.atualizar(endereco);
  }

  public deletePorIdEmpresa(idEmpresa: number): void {
    this.enderecoController.deletePorIdEmpresa(idEmpresa);
  }

  public pesquisarPorIdEmpresa(idEmpresa: number): EnderecoOUT {
    return this.enderecoController.porIdDaEmpresa(idEmpresa);
  }

}
