import { Component, OnInit } from '@angular/core';
import { ContaService } from 'src/app/services/conta.service';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { KeysEnum, NotificacaoListenersService } from 'src/app/services/listeners/notificacao-listeners.service';
import { ContaOUT } from 'src/dominio/core/service/ports/io/conta_IO';
import { EmpresaOUT } from 'src/dominio/core/service/ports/io/empresa_IO';
import { LancamentoOUT } from 'src/dominio/core/service/ports/io/lancamento_IO';

type Conta = {
  conta: ContaOUT;
  lancamentos: LancamentoOUT[];
}

@Component({
  selector: 'app-home-empresa-selecionada',
  templateUrl: './home-empresa-selecionada.component.html',
  styleUrls: ['./home-empresa-selecionada.component.css']
})

export class HomeEmpresaSelecionadaComponent implements OnInit {

  public empresa?: EmpresaOUT;
  public contas: Conta[] = [];
  public existContas = false;

  constructor(private notificacaoListeners: NotificacaoListenersService,
    private contaService: ContaService,
    private lancamentoService: LancamentoService) {

  }
 
  ngOnInit(): void {

    let value = this.notificacaoListeners.getNotificacao(KeysEnum.EmpresaOUT)?.getValue();
    this.notificacaoListeners.destroyNotificacao(KeysEnum.EmpresaOUT);
    if (!value) {
      throw new Error("Empresa não foi passada");
    }
    
    this.empresa = value as EmpresaOUT;
    this.loaderContas(this.empresa);
  } 

  private loaderContas(empresa: EmpresaOUT){
    try {
      this.recentes(this.contaService.todasPorEmpresa(empresa));
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  private recentes(contas: ContaOUT[]) {

    contas.forEach((conta) => {

      let lancamentos: LancamentoOUT[] = [];
      this.lancamentoService.recentes(conta).forEach((lancamento) => {
        lancamentos.push(lancamento);
      });

      this.addConta(conta, lancamentos);

    });

  }

  private addConta(contaNew: ContaOUT, lancamentos: LancamentoOUT[]){

    if (lancamentos.length > 0) {

      let conta: Conta = {
        conta: contaNew,
        lancamentos: lancamentos
      }

      this.existContas = true;
      this.contas.push(conta);
    }
  }

}
