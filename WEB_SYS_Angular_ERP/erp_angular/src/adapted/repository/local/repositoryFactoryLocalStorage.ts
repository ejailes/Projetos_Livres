import { RepositoryAuthLocalStorageImpl } from "./authorizationsLocalStorageImpl";
import { Empresas } from "src/dominio/core/repository/empresas";
import { EmpresasLocalStorageImpl } from "./empresasLocalStorageImpl";
import { Usuarios } from "src/dominio/core/repository/usuarios";
import { UsuariosLocalStorageImpl } from "./usuariosLocalStorageImpl";
import { Authorizations } from "src/dominio/core/repository/authorizations";
import { RepositoryFactory } from "src/dominio/factories/repositoryFactory";
import { Enderecos } from "src/dominio/core/repository/enderecos";
import { EnderecosLocalStorageImpl } from "./enderecosLocalStorageImpl";
import { Contas } from "src/dominio/core/repository/contas";
import { ContasLocalStorageImpl } from "./contasLocalStorageImpl";
import { Clientes } from "src/dominio/core/repository/clientes";
import { ClientesLocalStorageImpl } from "./clientesLocalStorageImpl";
import { Lancamentos } from "src/dominio/core/repository/lancamentos";
import { LancamentosLocalStorageImpl } from "./lancamentosLocalStorageImpl";

export class RepositoryFactoryLocalStorage implements RepositoryFactory {
    
    getRepositoryAuthorizations(): Authorizations {
        return new RepositoryAuthLocalStorageImpl(this.getRepositoryUsuarios());
    }

    getRepositoryEmpresas(): Empresas {
        return new EmpresasLocalStorageImpl();
    }

    getRepositoryEnderecos(): Enderecos {
        return new EnderecosLocalStorageImpl();
    }

    getRepositoryUsuarios(): Usuarios {
        return new UsuariosLocalStorageImpl();
    }

    getRepositoryContas(): Contas {
        return new ContasLocalStorageImpl();
    }

    getRepositoryClientes(): Clientes {
        return new ClientesLocalStorageImpl();
    }

    getRepositoryLancamentos(): Lancamentos {
        return new LancamentosLocalStorageImpl();
    } 

}