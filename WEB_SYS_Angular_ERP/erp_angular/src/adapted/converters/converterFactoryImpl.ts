import { ClienteConverter } from "src/dominio/core/service/ports/converters/clienteConverter";
import { ContaConverter } from "src/dominio/core/service/ports/converters/contaConverter";
import { EmpresaConverter } from "src/dominio/core/service/ports/converters/empresaConverter";
import { EnderecoConverter } from "src/dominio/core/service/ports/converters/enderecoConverter";
import { LancamentoConverter } from "src/dominio/core/service/ports/converters/lancamentoConverter";
import { ConverterFactory } from "src/dominio/factories/converterFactory";
import { RepositoryFactory } from "src/dominio/factories/repositoryFactory";
import { ClienteConverterImpl } from "./clienteConverterImpl";
import { ContaConverterImpl } from "./contaConverterImpl";
import { EmpresaConverterImpl } from "./empresaConverterImpl";
import { EnderecoConverterImpl } from "./enderecoConverterImpl";
import { LancamentoConverterImpl } from "./lancamentoConverterImpl";
import { AuthConverter } from "src/dominio/core/service/ports/converters/authConverter";
import { AuthConverterImpl } from "./authConverterImpl";

export class ConverterFactoryImpl implements ConverterFactory {
  
    getConverterEmpresa(): EmpresaConverter {
        return new EmpresaConverterImpl();
    }
    
    getConverterEndereco(): EnderecoConverter {
        return new EnderecoConverterImpl();
    }

    getConverterConta(): ContaConverter {
        return new ContaConverterImpl();
    }

    getConverterCliente(): ClienteConverter {
        return new ClienteConverterImpl();
    }

    getConverterAuth(): AuthConverter {
        return new AuthConverterImpl();
    }
    
    getConverterLancamento(repo: RepositoryFactory, converters: ConverterFactory): LancamentoConverter {
        return new LancamentoConverterImpl(repo, converters);
    }

}