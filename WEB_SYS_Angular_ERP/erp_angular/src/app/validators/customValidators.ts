import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {

    public static REGEX_CNPJ = new RegExp(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/);
    public static REGEX_CPF = new RegExp(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/);
    private static REGEX_CEP = new RegExp(/^\d{5}\-\d{3}$/);

    public static passwordConfirmeValidator(control: AbstractControl): ValidationErrors | null {

        const password = control.get('password');
        const confirme_password = control.get('confirme_password');

        if (password?.value !== confirme_password?.value) {
            return { passwordMatchError: true };
        }

        return null;
    }

    public static numberValidatorLengthMinMax(min: number, max?: number): ValidationErrors {

        return (control: AbstractControl) => {

            let num = control.value;

            if (!num || isNaN(num) || num < 0) {
                return { "invalido": true };
            }

            if (!max) {
                max = min;
            }

            if (num.toString().length < min) {
                return {
                    minlength: {
                        minlength: true,
                        requiredLength: min
                    }
                };
            }

            if (num.toString().length > max) {
                return {
                    maxlength: {
                        maxlength: true,
                        requiredLength: max
                    }
                };
            }

            return {};
        }
    }

    public static CNPJValidator(control: AbstractControl): ValidationErrors {

        const cnpj = control.value;
        return CustomValidators.REGEX_CNPJ.test(cnpj) ? {} : { CNPJError: true };

    }

    public static CEPValidator(control: AbstractControl): ValidationErrors {
        const cep = control.value;
        return CustomValidators.REGEX_CEP.test(cep) ? {} : { CEPError: true };
    }


    public static getError(key: string, field?: string, objError?: any) {
        return CustomValidators.mapErrors(key, field, objError);
    }

    private static mapErrors(key: string, field?: string, objError?: any): any {

        const errors: any = {
            required: `O Campo ${field} é Obrigatório`,
            email: `O Campo ${field} é Inválido`,
            minlength: `O Campo ${field} deve possuir pelo menos ${objError ? objError[key].requiredLength : null} caracteres`,
            maxlength: `O Campo ${field} deve possuir até ${objError ? objError[key].requiredLength : null} caracteres`,
            passwordMatchError: `Password diferente`,
            CNPJError: `CNPJ Inválido`,
            CPFError: `CPF Inválido`,
            CEPError: `CEP Inválido`,
            invalido: `Valor Inválido`
        }

        return errors[key];
    }
}