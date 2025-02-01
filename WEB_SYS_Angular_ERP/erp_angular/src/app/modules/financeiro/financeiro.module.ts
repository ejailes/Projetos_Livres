import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceiroRoutingModule } from './financeiro-routing.module';
import { ContasComponent } from './contas/contas.component';
import { ContaRouterOutletComponent } from './conta-router-outlet/conta-router-outlet.component';
import { FormNovaComponent } from './form-nova/form-nova.component';
import { DirectivesModule } from '../directives/directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask'
import { SharedModule } from '../shared/shared.module';
import { EmpresaGuard } from '../shared/guards/empresa.guard';
import { HomeComponent } from './lancamentos/home/home.component';
import { FormNovoComponent } from './lancamentos/form-novo/form-novo.component';
import { FormEditarComponent } from './lancamentos/form-editar/form-editar.component';


@NgModule({
  declarations: [
    ContasComponent,
    ContaRouterOutletComponent,
    FormNovaComponent,
    HomeComponent,
    FormNovoComponent,
    FormEditarComponent 
  ],
  imports: [
    CommonModule,
    FinanceiroRoutingModule,
    ReactiveFormsModule,
    DirectivesModule,
    SharedModule,
    FormsModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    ContasComponent
  ],
  providers: [EmpresaGuard]
})
export class FinanceiroModule { }
