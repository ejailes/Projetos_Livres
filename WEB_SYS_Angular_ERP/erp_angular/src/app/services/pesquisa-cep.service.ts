import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, take } from 'rxjs/operators';
import { EnderecoINImpl } from 'src/adapted/dto/enderecoDTO';
import { EnderecoIN } from 'src/dominio/core/service/ports/io/endereco_IO';

@Injectable({
  providedIn: 'root'
})
export class PesquisaCepService {

  private cep: string = "";
  private api: string = "https://viacep.com.br";

  constructor(private http: HttpClient) { }

  public setCep(cep: string) {
    this.cep = cep;
  }

  public execute() {

    const url = (`${this.api}/ws/${this.cep}/json/`);

    return this.http.get<EnderecoIN>(url)
      .pipe(
        map((value:any) => {
          if ("erro" in value) {
            throw { CEPError: true };
          }
          
          let endereco:EnderecoIN = new EnderecoINImpl(value.cep, value.logradouro, value.bairro,value.localidade, value.uf);
          return endereco;

        })
        , catchError(err => { throw err.CEPError ? err : "Erro ao pesquisar o CEP" })
        , take(1));
  }
}
