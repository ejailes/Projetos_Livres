import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { CustomValidators } from '../../validators/customValidators';

@Directive({
  selector: '[inputValidation]'
})
export class InputValidationDirective {

  @Input()
  public form?: AbstractControl;

  @Input()
  public keyFormGroup?: string;

  @Input()
  public field!: string;
  @Input()
  public onUpdate!: boolean;
  private div?: HTMLElement;

  constructor(private _el: ElementRef, private _renderer: Renderer2) {

  }

  private createDiv(key: string, field: string, objError:any) {

    this.clearDiv();
    this.div = this._renderer.createElement('div');
    const text = this._renderer.createText(CustomValidators.getError(key, field, objError));

    this._renderer.addClass(this._el.nativeElement, "is-invalid");
    this._renderer.addClass(this.div, "invalid-feedback");
    this._renderer.appendChild(this.div, text);
    this._renderer.appendChild(this._el.nativeElement.parentNode, this.div);
  }

  private clearDiv() {
    if (this.div) {
      this._renderer.removeChild(this._el.nativeElement.parentNode, this.div);
      this.div = undefined;
    }
  }

  @HostListener('change')
  public ngOnChanges() {
    this.inputIsInvalid();
  }

  private inputIsInvalid() {

    const error = this.getFormControl();
    if (error && (this.form?.dirty || this.form?.touched)) {
      this.createDiv(error, this.field, this.form?.errors);
    }

    if (!error && this.form?.valid) {
      this._renderer.removeClass(this._el.nativeElement, "is-invalid");
      this.clearDiv();
    }
  }

  private getFormControl(): any {

    if (!this.form) {
      return null;
    }
   
    let error = this.getError(this.form);
    if (!error && this.keyFormGroup) {
      const form = this.isFormGroup();
      if (form) {
        error = this.getError(form);
      }
    }

    return error;
  }

  private isFormGroup(){
    if(!this.keyFormGroup){
      return null;
    }

    let form = this.form?.root?.get(this.keyFormGroup);
     if(form instanceof UntypedFormGroup){
      return form;
     }

     return null;
  }

  private getError(form: AbstractControl) {

    let result;
    for (let error in form.errors) {
      result = error;
      break;
    }
  
    return result;
  }

}

