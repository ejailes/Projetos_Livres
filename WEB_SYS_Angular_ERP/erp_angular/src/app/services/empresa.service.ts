import { Injectable } from '@angular/core';
import { RepositoryFactoryLocalStorage } from 'src/adapted/repository/local/repositoryFactoryLocalStorage';
import { EmpresaController } from 'src/dominio/controller/empresaController';
import { RepositoryFactory } from 'src/dominio/factories/repositoryFactory';
import { EnderecoService } from './endereco.service';
import { ContaService } from './conta.service';
import { EmpresaIN, EmpresaOUT } from 'src/dominio/core/service/ports/io/empresa_IO';
import { ConverterFactoryImpl } from 'src/adapted/converters/converterFactoryImpl';
import { ConverterFactory } from 'src/dominio/factories/converterFactory';
import { UsuarioOUT } from 'src/dominio/core/service/ports/io/usuario_IO';
import { LancamentoService } from './lancamento.service';
import { ClienteService } from './cliente.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private empresaController: EmpresaController;

  constructor(private enderecoService: EnderecoService, private contaService: ContaService) {

    let repository: RepositoryFactory = new RepositoryFactoryLocalStorage();
    let converters: ConverterFactory = new ConverterFactoryImpl();
    this.empresaController = new EmpresaController(repository, converters);

  }

  public nova(empresa: EmpresaIN): void {

    let empresaOUT: EmpresaOUT | null = null;

    try {

      let enderecoIN = empresa.getEndereco();
      this.empresaController.nova(empresa);
      empresaOUT = this.pesquisarPorCNPJ(empresa.getCnpj());
      this.enderecoService.novo(empresaOUT, enderecoIN);

    } catch (error) {

      this.rollback(empresaOUT);
      throw error;
    }

  }

  private rollback(empresaOUT: EmpresaOUT | null) {
    if (!empresaOUT) {
      return;
    }

    this.deleteRollback(empresaOUT);
  }

  public atualizar(empresa: EmpresaOUT) {
    this.empresaController.atualizar(empresa);
    this.enderecoService.atualizar(empresa.getEndereco());
  }

  public deleteRollback(empresa: EmpresaOUT) {
    this.enderecoService.deletePorIdEmpresa(empresa.getId());
    this.empresaController.delete(empresa);
  }

  public delete(clienteService: ClienteService, lancamentoService: LancamentoService, empresa: EmpresaOUT) {

    clienteService.deletarTodosPorEmpresa(empresa, lancamentoService);
    this.contaService.deletarTodasContasPorEmpresa(empresa);
    this.enderecoService.deletePorIdEmpresa(empresa.getId());
    this.empresaController.delete(empresa); 
  }

  public todasPorEmailDoUsuario(usuario: UsuarioOUT): EmpresaOUT[] {
    return this.empresaController.todasPorEmaildoUsuario(usuario);
  }

  public pesquisarPorID(id: number): EmpresaOUT {
    let empresa = this.empresaController.pesquisarPorID(id);
    let endereco = this.enderecoService.pesquisarPorIdEmpresa(empresa.getId());
    empresa.setEndereco(endereco);

    return empresa;
  }

  public pesquisarPorCNPJ(cnpj: string): EmpresaOUT {
    return this.empresaController.pesquisarPorCNPJ(cnpj);
  }

}
