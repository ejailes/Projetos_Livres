import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputValidationDirective } from './input-validation.directive';
import { LabelValidationDirective } from './label-validation.directive';

@NgModule({
  declarations: [
    InputValidationDirective,
    LabelValidationDirective
  ],
  imports: [
    CommonModule
  ],
   exports: [
    InputValidationDirective,
    LabelValidationDirective
   ]
})
export class DirectivesModule { }
