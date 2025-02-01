import { Empresa } from "src/dominio/core/entity/empresa";
import { Empresas } from "src/dominio/core/repository/empresas";

export class EmpresasLocalStorageImpl implements Empresas {

    private storage: Storage;

    constructor() {
        this.storage = window.localStorage;
    }
   
    nova(empresa: Empresa): void {

        this.checkStorage();

        if (this.empresaExist(empresa)) {
            throw new Error(`Empresa com CNPJ ${empresa.cnpj} já cadastrado!`);
        }
        
        let empresas = this.gerarId(empresa);
        this.setLocalStorage(empresas);

    }

    atualizar(empresaNew: Empresa): void {
        
        this.checkStorage();

        let empresas = this.todas()
        .map(empresa =>  { 
            if(empresa.cnpj == empresaNew.cnpj){
                empresa.nome = empresaNew.nome;
            }
            return empresa;
        });

        this.setLocalStorage(empresas);
    }

    private empresaExist(empresa: Empresa): boolean {

        let empresaTemp = this.buscarPorCnpj(empresa.cnpj);
        return empresaTemp.cnpj === empresa.cnpj;
    }

    private checkStorage() {
        if (!this.storage) {
            throw new Error("Navegador não suporta gravação Storage!");
        }
    }

    private empresaNotExist(cnpj: string): boolean {
        return !this.empresaExist(new Empresa("", cnpj, ""));
    }

    buscarPorId(id: number): Empresa {

        const empresas = this.todas();

        for (let empresa of empresas) {
            if (empresa.geId() === id) {
                return empresa;
            }
        }

        throw new Error(`Empresa com ID: ${id} não encontrada`);
    }

    buscarPorCnpj(cnpj: string): Empresa {

        let empresaTemp = new Empresa("", "", "");
        const empresas = this.todas();

        for (let empresa of empresas) {
            if (empresa.cnpj === cnpj) {
                empresaTemp = empresa;
                break;
            }
        }

        return empresaTemp;
    }

    private setLocalStorage(empresas: Empresa[]) {
        this.storage.setItem("erp.angular.db.empresas", JSON.stringify(empresas));
    }

    private gerarId(empresa: Empresa): Empresa[] {

        let empresas = this.todas();
        if (empresas.length < 1) {
            empresa.setId(1);
            empresas.push(empresa);

        } else {

            let lastId = empresas.slice(-1)[0].geId();
            empresa.setId(lastId + 1);
            empresas.push(empresa);
        }

        return empresas;
    }

    todas(): Empresa[] {

        let empresas: Empresa[] = [];
        let lista = this.storage.getItem("erp.angular.db.empresas");
        if (!lista) {
            return empresas;
        }

        let empresasTemp = JSON.parse(lista);
        for (let empresa of empresasTemp) {
            let empresaTemp = new Empresa(empresa.nome, empresa.cnpj, empresa.emailUsuario);
            empresaTemp.setId(empresa.id);
            empresas.push(empresaTemp);
        }

        return empresas;
    }


    todasPorEmailDoUsuario(email: string): Empresa[] {

        let empresas: Empresa[] = [];
        empresas = this.todas()
            .filter(empresa => empresa.emailUsuario === email)
            .map((empresa) => empresa);

        return empresas;
    }

    deletarPorCnpj(cnpj: string): void {

        if (this.empresaNotExist(cnpj)) {
            throw new Error(`Empresa com CNPJ ${cnpj} não existe!`);
        }

        let empresas = this.todas().filter(empresa => empresa.cnpj !== cnpj).map(empresa => empresa);
        this.setLocalStorage(empresas);
    }
}