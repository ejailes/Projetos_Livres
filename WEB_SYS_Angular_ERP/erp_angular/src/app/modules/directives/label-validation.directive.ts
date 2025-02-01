import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[labelValidation]'
})
export class LabelValidationDirective {

  @Input()
  public onUpdate!: boolean;

  constructor() { }

  @HostBinding('class.text-danger')
  @HostListener('change')
  public get toogleClass() {
    return this.onUpdate;
  }

}
