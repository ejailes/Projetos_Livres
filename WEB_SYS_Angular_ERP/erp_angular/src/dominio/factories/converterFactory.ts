import { AuthConverter } from "../core/service/ports/converters/authConverter";
import { ClienteConverter } from "../core/service/ports/converters/clienteConverter";
import { ContaConverter } from "../core/service/ports/converters/contaConverter";
import { EmpresaConverter } from "../core/service/ports/converters/empresaConverter";
import { EnderecoConverter } from "../core/service/ports/converters/enderecoConverter";
import { LancamentoConverter } from "../core/service/ports/converters/lancamentoConverter";
import { RepositoryFactory } from "./repositoryFactory";

export interface ConverterFactory {

    getConverterEmpresa(): EmpresaConverter;
    getConverterEndereco(): EnderecoConverter;
    getConverterConta(): ContaConverter;
    getConverterCliente(): ClienteConverter;
    getConverterAuth(): AuthConverter;
    getConverterLancamento(repo: RepositoryFactory, converters: ConverterFactory): LancamentoConverter;


}