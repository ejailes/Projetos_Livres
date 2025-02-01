import { Authorizations } from "../core/repository/authorizations";
import { Clientes } from "../core/repository/clientes";
import { Contas } from "../core/repository/contas";
import { Empresas } from "../core/repository/empresas";
import { Enderecos } from "../core/repository/enderecos";
import { Lancamentos } from "../core/repository/lancamentos";
import { Usuarios } from "../core/repository/usuarios";

export interface RepositoryFactory {
    
    getRepositoryAuthorizations(): Authorizations;
    getRepositoryEmpresas(): Empresas;
    getRepositoryEnderecos(): Enderecos;
    getRepositoryUsuarios(): Usuarios;
    getRepositoryContas(): Contas;
    getRepositoryClientes(): Clientes;
    getRepositoryLancamentos(): Lancamentos;


}