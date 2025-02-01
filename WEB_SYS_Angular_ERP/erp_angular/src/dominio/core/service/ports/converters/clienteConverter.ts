import { Cliente } from "src/dominio/core/entity/cliente";
import { ClienteOUT } from "../io/cliente_IO";

export interface ClienteConverter { 

    toCliente(cliente: ClienteOUT): Cliente
    toListClienteOUT(clientes: Cliente[]): ClienteOUT[]
    toClienteOUT(cliente: Cliente): ClienteOUT
   
} 