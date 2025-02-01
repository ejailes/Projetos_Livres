import { Conta } from "src/dominio/core/entity/conta";
import { ContaIN, ContaOUT } from "src/dominio/core/service/ports/io/conta_IO";
import { ContaConverter } from "src/dominio/core/service/ports/converters/contaConverter";
import { ContaOUTImpl } from "../dto/contaDTO";

export class ContaConverterImpl implements ContaConverter {
    
    public constructor(){

    }

    public toConta(conta: ContaIN): Conta {

        let contaConverter = new Conta(conta.getNomeBanco(), conta.getNumAgencia(), conta.getConta(), conta.getTipoConta());
        contaConverter.setIdEmpresa(conta.getEmpresa().getId());

        return contaConverter;

    }

    public toContaOUT(conta: Conta): ContaOUT {

        let contaOUT = new ContaOUTImpl(conta.getId());
        contaOUT.setIdEmpresa(conta.getIdEmpresa());
        contaOUT.setNomeBanco(conta.getBanco());
        contaOUT.setNumAgencia(conta.getAgencia());
        contaOUT.setConta(conta.getConta());
        contaOUT.setTipoConta(conta.getTipoConta());

        return contaOUT;
    }

    public toListContaOUT(contas: Conta[]): ContaOUT[] {

        let contasTemp: ContaOUT[] = [];
        for (let conta of contas) {
            contasTemp.push(this.toContaOUT(conta));
        }
        return contasTemp;
    }

}