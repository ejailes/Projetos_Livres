export class NumeroConta {

    constructor(private numero: number, private digite: number) {
    }

    public getNumeroConta(): string{
        return this.numero + "" + this.digite;
    }

    public getNumeroContaComDigito(): string{
        return this.numero + "-" + this.digite;
    }

}