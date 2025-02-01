import { Empresa } from "src/dominio/core/entity/empresa"
import { EmpresaIN, EmpresaOUT } from "../io/empresa_IO"

export interface EmpresaConverter {

    toEmpresa(empresa: EmpresaIN): Empresa
    toEmpresa(empresa: EmpresaOUT): Empresa
    toEmpresa(empresa: EmpresaIN | EmpresaOUT): Empresa 
    toEmpresaOUT(empresa: Empresa): EmpresaOUT
    
}