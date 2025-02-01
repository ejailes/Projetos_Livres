import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { ModalService } from 'src/app/services/modal.service';
import { EmpresaOUT } from 'src/dominio/core/service/ports/io/empresa_IO';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  public empresas: EmpresaOUT[] = [];
  public existEmpresas = false;

  constructor(private router: Router, private empresaService: EmpresaService,
    private auth: AuthService, private modalService: ModalService,
    private lancamentoService: LancamentoService, private clienteService: ClienteService) {
  }

  ngOnInit(): void {
    this.initLoaderEmpresas();
  }

  private initLoaderEmpresas() {
    try {
      this.loaderEmpresas();
    } catch (error) {
      this.modalService.openModalAlertaDanger((error as Error).message);
    }
  }

  public onDelete(empresa: EmpresaOUT) {

    this.modalService.openModalConfirmWindow("Você confirma a exclusão dessa Empresa ?").subscribe((value) => {
      this.delete(value, empresa);
    });
  }

  private delete(value: boolean, empresa: EmpresaOUT) {
 
    try {

      if (value) {
        this.empresaService.delete(this.clienteService, this.lancamentoService, empresa);
        this.loaderEmpresas();
      } 

    } catch (error) {
      this.modalService.openModalAlertaDanger((error as Error).message);
    }

  }

  private loaderEmpresas() {
    this.empresas = this.empresaService.todasPorEmailDoUsuario(this.auth.getLogged());
    this.existEmpresasUpdate();
  }

  public onClick() {
    this.router.navigate(['empresas/nova']);
  }

  private existEmpresasUpdate() {

    if (this.empresas.length > 0) {
      this.existEmpresas = true;
    } else {
      this.existEmpresas = false;
    }

  }

}

