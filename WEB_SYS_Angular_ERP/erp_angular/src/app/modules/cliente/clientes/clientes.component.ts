import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { KeysEnum, NotificacaoListenersService } from 'src/app/services/listeners/notificacao-listeners.service';
import { ModalService } from 'src/app/services/modal.service';
import { ClienteOUT } from 'src/dominio/core/service/ports/io/cliente_IO';
import { EmpresaOUT } from 'src/dominio/core/service/ports/io/empresa_IO';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public empresa!: EmpresaOUT;
  public clientes: ClienteOUT[] = [];
  public existClientes = false;

  constructor(private notificacaoListeners: NotificacaoListenersService,
    private route: ActivatedRoute, private router: Router, private lancamentoService: LancamentoService,
    private clienteService: ClienteService, private modalService: ModalService) {
  }

  ngOnInit(): void {

    let value = this.notificacaoListeners.getNotificacao(KeysEnum.EmpresaOUT)?.getValue();
    this.notificacaoListeners.destroyNotificacao(KeysEnum.EmpresaOUT);
    if (!value) {
      throw new Error("Empresa não foi passada");
    }

    this.empresa = value as EmpresaOUT;
    this.initLoaderClientes();

  }

  private initLoaderClientes() {
    try {
      this.loaderClientes();
    } catch (error) {
      this.modalService.openModalAlertaDanger((error as Error).message);
    }
  }

  onDelete(cliente: ClienteOUT) {

    this.modalService.openModalConfirmWindow("Você confirma a exclusão da Cliente " + cliente.getNome() + " ?").subscribe((value) => {
      this.delete(value, cliente);
    });
  }

  private delete(value: boolean, cliente: ClienteOUT) {

    try {
      if (value) {
        this.clienteService.deletar(cliente, this.lancamentoService);
        this.loaderClientes();
      }

    } catch (error) {
      this.modalService.openModalAlertaDanger((error as Error).message);
    }
  }

  private loaderClientes() {
    this.clientes = this.clienteService.todosPorEmpresa(this.empresa);
    this.existClientesUpdate();
  }

  private existClientesUpdate() {

    if (this.clientes.length > 0) {
      this.existClientes = true;
    } else {
      this.existClientes = false;
    }
  }

  onClick() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

}
