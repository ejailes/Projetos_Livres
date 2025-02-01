import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContaService } from 'src/app/services/conta.service';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { KeysEnum, NotificacaoListenersService } from 'src/app/services/listeners/notificacao-listeners.service';
import { ModalService } from 'src/app/services/modal.service';
import { ContaOUT } from 'src/dominio/core/service/ports/io/conta_IO';
import { EmpresaOUT } from 'src/dominio/core/service/ports/io/empresa_IO';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})
export class ContasComponent implements OnInit {

  public contas: ContaOUT[] = [];
  public empresa!: EmpresaOUT;
  public existContas = false;

  constructor(private route: ActivatedRoute, private router: Router,
    private contaService: ContaService, private lancamentoService: LancamentoService,
    private notificacaoListeners: NotificacaoListenersService,
    private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.getEmpresa();
  }

  private getEmpresa() {

    let value = this.notificacaoListeners.getNotificacao(KeysEnum.EmpresaOUT)?.getValue();
    this.notificacaoListeners.destroyNotificacao(KeysEnum.EmpresaOUT);
    if (!value) {
      throw new Error("Empresa não foi passada");
    }

    this.empresa = value as EmpresaOUT;
    this.initLoaderContas();
  }

  private initLoaderContas() {
    try {
      this.loaderContas();
    } catch (error) {
      this.modalService.openModalAlertaDanger((error as Error).message);
    }
  }

  onClick() {
    this.router.navigate(['nova'], { relativeTo: this.route });
  }

  onDelete(conta: ContaOUT) {

    this.modalService.openModalConfirmWindow("Você confirma a exclusão da Conta " + conta.getNomeBanco() + " ?").subscribe((value) => {
      this.delete(value, conta);
    });
  }

  private delete(value: boolean, conta: ContaOUT) {

    try {

      if (value) {
        this.contaService.deletar(conta, this.lancamentoService);
        this.loaderContas();
      }

    } catch (error) {
      this.modalService.openModalAlertaDanger((error as Error).message);
    }

  }

  private loaderContas() {
    this.contas = this.contaService.todasPorEmpresa(this.empresa);
    this.existContasUpdate();
  }

  private existContasUpdate() {

    if (this.contas.length > 0) {
      this.existContas = true;
    } else {
      this.existContas = false;
    }

  }

}
