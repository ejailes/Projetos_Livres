import { Cliente } from "src/dominio/core/entity/cliente";

export class ClienteTipo {

    public static check(tipo: string) {

        type TipoKey = keyof typeof Cliente.Tipo;

        const result = Object.entries(Cliente.Tipo).map((arr, index) => {
            return { key: arr[0], value: arr[1] }
        }).filter((obj) => {
            if (obj.value === tipo) {
                return true;
            }
            return false;
        }).map((obj) => obj.key as TipoKey)[0];

        return result;
    }

    /*
     public static checkTipoCategoria(categoria: string) {
 
         type CategoriaKey = keyof typeof CategoriaClienteEnum;
 
         const result = Object.entries(CategoriaClienteEnum).map((arr, index) => {
             return { key: arr[0], value: arr[1] };
         }).filter((obj) => {
             if (obj.value === categoria) {
                 return true;
             }
             return false;
         }).map((obj) => obj.key as CategoriaKey)[0];
 
         return result;
     }*/

}