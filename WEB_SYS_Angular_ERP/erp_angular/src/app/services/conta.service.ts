import { Injectable } from '@angular/core';
import { ConverterFactoryImpl } from 'src/adapted/converters/converterFactoryImpl';
import { RepositoryFactoryLocalStorage } from 'src/adapted/repository/local/repositoryFactoryLocalStorage';
import { ContaController } from 'src/dominio/controller/contaController';
import { ContaIN, ContaOUT } from 'src/dominio/core/service/ports/io/conta_IO';
import { EmpresaOUT } from 'src/dominio/core/service/ports/io/empresa_IO';
import { ConverterFactory } from 'src/dominio/factories/converterFactory';
import { RepositoryFactory } from 'src/dominio/factories/repositoryFactory';
import { LancamentoService } from './lancamento.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  private contaController: ContaController;

  constructor(private router: Router) {
    let repository: RepositoryFactory = new RepositoryFactoryLocalStorage();
    let converters: ConverterFactory = new ConverterFactoryImpl();
    this.contaController = new ContaController(repository, converters);
  }

  public nova(conta: ContaIN): void {
    this.contaController.nova(conta);
  }

  public todasPorEmpresa(empresa: EmpresaOUT): ContaOUT[] {
    return this.contaController.todasPorIDdaEmpresa(empresa);
  }

  public deletar(conta: ContaOUT, lancamentoService: LancamentoService): void {
    lancamentoService.deletarTodosPorConta(conta);
    this.contaController.delete(conta);
  }

  public deletarTodasContasPorEmpresa(empresa: EmpresaOUT) {

    let contas: ContaOUT[] = this.todasPorEmpresa(empresa);
    contas.forEach((conta) => {
      this.contaController.delete(conta);
    });
  }

  public pesquisarPorID(id: number) {
    try {
      return this.contaController.porId(id);
    } catch (error) {
      this.router.navigate(['empresas']);
      throw error;
    }
  }

  public pesquisarPorIDAssociadoEmpresa(empresa: EmpresaOUT, id: number) {

    let conta: ContaOUT = this.pesquisarPorID(id);
    
    try {
      this.checkPermissao(empresa, conta);
    } catch (error) {
      this.router.navigate(['empresas']);
      throw error;
    }

    return conta;
  }

  private checkPermissao(empresa: EmpresaOUT, conta: ContaOUT){
    if (conta.getIdEmpresa() !== empresa.getId()) {
      throw new Error("Não existe Conta para pesquisar os Lançamentos Associados!!!");
    }
  }

}
