export class IntervaloData {

    private readonly inicial: Date;
    private readonly final: Date;

    constructor(inicial: Date, final: Date) {
        this.inicial = inicial;
        this.final = final;
        this.removeTime();
    }

    private removeTime(){
        this.inicial.setHours(0, 0, 0, 0);
        this.final.setHours(0, 0, 0, 0);
    }

    public getDataInit() {
        this.validateDate();
        return this.inicial;
    }

    public getDataFim() {
        this.validateDate();
        return this.final;
    }

    private validateDate() {

        const dataNow = new Date();
        dataNow.setHours(0, 0, 0, 0);

        if (this.inicial > dataNow || this.final > dataNow) {
            throw new Error("A data informada e maior que a data de Hoje");
        }

    }

}