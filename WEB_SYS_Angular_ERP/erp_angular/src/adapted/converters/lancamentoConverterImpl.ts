import { Lancamento } from "src/dominio/core/entity/lancamento";
import { LancamentoConverter } from "src/dominio/core/service/ports/converters/lancamentoConverter";
import { LancamentoIN, LancamentoOUT, TipoLancamentoEnum } from "src/dominio/core/service/ports/io/lancamento_IO";
import { LancamentoOUTImpl } from "../dto/lancamentoDTO";
import { ClienteController } from "src/dominio/controller/clienteController";
import { RepositoryFactory } from "src/dominio/factories/repositoryFactory";
import { ConverterFactory } from "src/dominio/factories/converterFactory";

export class LancamentoConverterImpl implements LancamentoConverter {

    private clienteController: ClienteController;

    constructor(repo: RepositoryFactory, converters: ConverterFactory) {
        this.clienteController = new ClienteController(repo, converters);
    }

    toLancamento(lancamento: LancamentoIN): Lancamento
    toLancamento(lancamento: LancamentoOUT): Lancamento
    toLancamento(lancamento: any): Lancamento {

        if (lancamento.tipo === TipoLancamentoEnum.IN_LANCAMENTO) {

            return new Lancamento(lancamento.getConta().getId(), lancamento.getCliente().getID(),
                lancamento.getTipoOperacao(), lancamento.getDescricao(),
                lancamento.getValor(), lancamento.getData());

        }

        if (lancamento.tipo == TipoLancamentoEnum.OUT_LANCAMENTO) {
            
            let lancamentoConverter = new Lancamento(lancamento.getIdConta(), lancamento.getClienteOUT().getID(),
                lancamento.getTipoOperacao(), lancamento.getDescricao(),
                this.valorConverter(lancamento.getValor()), lancamento.getData());

            lancamentoConverter.setId(lancamento.id);
            
            return lancamentoConverter;

        }

        throw new Error("Não foi possível converter o lançamento");
    }

    private valorConverter(valorStr: string) {
        const valor = valorStr.replace(/[R$]/g, "").replace(/,/g, ".").trim();
        return +Number.parseFloat(valor).toFixed(2);
      }

    toListLancamentoOUT(lancamentos: Lancamento[]): LancamentoOUT[] {

        let lancamentosTemp: LancamentoOUT[] = [];
        for (let lancamento of lancamentos) {
            lancamentosTemp.push(this.toLancamentoOUT(lancamento));
        }

        return lancamentosTemp;
    }

    toLancamentoOUT(lancamento: Lancamento): LancamentoOUT {

        let lancamentoOUT = new LancamentoOUTImpl(lancamento.getId(), lancamento.getIdConta());
        lancamentoOUT.setClienteOUT(this.clienteController.porId(lancamento.getIDCliente()));
        lancamentoOUT.setData(lancamento.getData());
        lancamentoOUT.setDescricao(lancamento.getDescricao());
        lancamentoOUT.setTipoOperacao(lancamento.getTipoOperacao());
        lancamentoOUT.setValor(lancamento.getValor());

        return lancamentoOUT;
    }

}