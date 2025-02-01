import { Usuario } from "../entity/usuario";

export interface Usuarios {

    criar(usuario:Usuario): void;
    buscarPorEmail(email:string):Usuario;
    todos():Usuario[]
    
}