import { Empresa } from "src/dominio/core/entity/empresa";
import { EmpresaIN, EmpresaOUT, TipoEmpresaEnum } from "src/dominio/core/service/ports/io/empresa_IO";
import { EmpresaOUTImpl } from "../dto/empresaDTO";

export class EmpresaConverterImpl {

    public toEmpresa(empresa: EmpresaIN): Empresa
    public toEmpresa(empresa: EmpresaOUT): Empresa
    public toEmpresa(empresa: any): Empresa {

        if (empresa.tipo === TipoEmpresaEnum.IN_EMPRESA) {
            return new Empresa(empresa.getNome(), empresa.getCnpj(), empresa.getUsuario().getEmail());
        }

        if (empresa.tipo === TipoEmpresaEnum.OUT_EMPRESA) {
            return new Empresa(empresa.getNome(), empresa.getCnpj(), empresa.getIDUsuario());
        }
 
        throw new Error("Não foi possível converter a Empresa");
    }

    public toEmpresaOUT(empresa: Empresa): EmpresaOUT {

        let empresaOUT = new EmpresaOUTImpl(empresa.geId(), empresa.nome, empresa.cnpj)
        empresaOUT.setIDUsuario(empresa.emailUsuario);

        return empresaOUT;
    }
    
}