import { Endereco } from "src/dominio/core/entity/endereco";
import { Enderecos } from "src/dominio/core/repository/enderecos";

export class EnderecosLocalStorageImpl implements Enderecos {

    private storage: Storage;

    constructor() {
        this.storage = window.localStorage;
    }

    novo(endereco: Endereco): void {

        if (!this.storage) {
            throw new Error("Navegador não suporta gravação Storage!");
        }

        let enderecos = this.gerarId(endereco);
        this.setLocalStorage(enderecos);

    }

    private gerarId(endereco: Endereco): Endereco[] {

        let enderecos = this.todos();
        if (enderecos.length < 1) {
            endereco.setId(1);
            enderecos.push(endereco);

        } else {

            let lastId = enderecos.slice(-1)[0].getId();
            endereco.setId(lastId + 1);
            enderecos.push(endereco);
        }

        return enderecos;
    }

    private setLocalStorage(enderecos: Endereco[]) {
        this.storage.setItem("erp.angular.db.enderecos", JSON.stringify(enderecos));
    }

    atualizar(enderecoNew: Endereco): void {

        let enderecos = this.todos()
            .map((endereco) => {
                if (endereco.getId() == enderecoNew.getId()) {
                    endereco = enderecoNew;
                }
                return endereco;
            });

        this.setLocalStorage(enderecos);
    }

    todos(): Endereco[] {

        let enderecos: Endereco[] = [];
        let lista = this.storage.getItem("erp.angular.db.enderecos");
        if (!lista) {
            return enderecos;
        }

        let enderecosTemp = JSON.parse(lista);
        for (let endereco of enderecosTemp) {

            let end = Object.assign(new Endereco(), endereco);
            end.setId(endereco.id);
            end.setIdEmpresa(endereco.id_empresa);

            enderecos.push(end);
        }

        return enderecos;
    }

    porIdDaEmpresa(id: number) {
        let endereco = this.todos()
            .filter(endereco => endereco.getIdEmpresa() === id)
            .map((endereco) => endereco)[0];

        return endereco;
    }

    deletarPorIdEmpresa(id: number): void {

        let enderecos = this.todos()
            .filter(endereco => endereco.getIdEmpresa() !== id)
            .map(endereco => endereco);

        if (enderecos.length < 0) {
            throw new Error("Não existe endereço com esse id de empresa para exclusão");
        }

        this.setLocalStorage(enderecos);
    }
}