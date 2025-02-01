import { LancamentoOUT } from "src/dominio/core/service/ports/io/lancamento_IO";
import { Pagination } from "src/dominio/core/service/ports/io/pagination_IO";

export class PaginationImpl implements Pagination<LancamentoOUT[]> {

    private value?: LancamentoOUT[];
    private paginas: number[] = [];
    private pagina: number = 0;
    private static readonly SIZE: number = 3;

    constructor() {

    }

    setValue(value: LancamentoOUT[]): void {
        this.value = value;
        this.createPaginas();
    }

    getSize(): number {
        return PaginationImpl.SIZE;
    }

    setPagina(pagina: number): void {
        this.pagina = pagina;
    }

    getPagina(): number {
        return this.pagina;
    }

    getPaginas(): number[] {
        return this.paginas;
    }

    private createPaginas() {

        if (!this.value) {
            throw new Error("Pesquisa inválida");
        }

        const tamanhoGeral = this.value.length;
        let pagsNum = Math.ceil(tamanhoGeral / PaginationImpl.SIZE);
        const pagsArr: number[] = [];
        for (let x: number = 0; x < pagsNum; x++) {
            pagsArr.push(x);
        }

        this.paginas = pagsArr;
    }

    public getValue(): LancamentoOUT[] {

        if (!this.value || !this.paginas || (this.pagina > (this.paginas.length - 1)) || this.pagina < 0) {
            throw new Error("Não existe Lancamento(s)");
        }

        let index = this.paginas[this.pagina] * PaginationImpl.SIZE;
        const lancamentos = this.value.slice((index), (index + PaginationImpl.SIZE));

        return lancamentos;

    }

    public navPrevious(): void {
        const pag = this.getPagina() - 1;
        this.setPagina(this.checkSizePag(pag));
    }

    public navNext(): void {
        const pag = this.getPagina() + 1;
        this.setPagina(this.checkSizePag(pag));
    }

    public navPag(pagina: number): void {
        this.setPagina(pagina);
    }

    private checkSizePag(pag: number) {

        const paginas = this.getPaginas();
        if (!paginas.includes(pag)) {
            return this.getPagina();
        }

        return pag;
    }
}