export class Usuario {

    private password?: string;

    constructor(readonly nome: string, readonly email: string) {

    }

    public setPassword(password: string) {
        this.password = password;
    }

    public getPassword(): string {
        return this.password || "";
    }

}