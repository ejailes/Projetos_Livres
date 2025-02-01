import { Conta } from "../entity/conta";

export interface Contas {

    nova(conta: Conta): void;
    excluir(id: number): void;
    buscarPorId(id: number): Conta;
    buscarPorNumeroDeConta(numConta: string): Conta;
    todas(): Conta[];
    todasPorIdEmpresa(id: number): Conta[];
}
