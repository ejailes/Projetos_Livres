import { TipoOperacaoEnum } from "src/dominio/core/valueObject/tipoOperacao";

export class OperacaoTipo {

    public static check(operacao: string) {

        type OperacaoKey = keyof typeof TipoOperacaoEnum;

        const result = Object.entries(TipoOperacaoEnum).map((arr, index) => {
            return { key: arr[0], value: arr[1] };
        }).filter((obj) => {
            if (obj.value === operacao) {
                return true;
            }
            return false;
        }).map((obj) => obj.key as OperacaoKey)[0];

        return result;
    }

}