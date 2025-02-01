import { Usuario } from "../entity/usuario";

export interface Authorizations {

    login(usuario: Usuario): void;
    logout(): void;
    logged(): Usuario;
}