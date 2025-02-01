import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresasComponent } from './empresas/empresas.component';
import { FormNovaComponent } from './form-nova/form-nova.component';
import { EmpresaRouterOutletComponent } from './empresa-router-outlet/empresa-router-outlet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DirectivesModule } from '../directives/directives.module';
import { NgxMaskModule } from 'ngx-mask'
import { HttpClientModule } from '@angular/common/http';
import { FormEditarComponent } from './form-editar/form-editar.component';
import { HomeEmpresaSelecionadaComponent } from './home-empresa-selecionada/home-empresa-selecionada.component';
import { FinanceiroModule } from '../financeiro/financeiro.module';
import { ClienteModule } from '../cliente/cliente.module';
import { EmpresaGuard } from '../shared/guards/empresa.guard';


@NgModule({
  declarations: [
    EmpresasComponent,
    FormNovaComponent,
    EmpresaRouterOutletComponent,
    FormEditarComponent,
    HomeEmpresaSelecionadaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    EmpresaRoutingModule,
    SharedModule,
    DirectivesModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    FinanceiroModule,
    ClienteModule
  ],
  providers: [EmpresaGuard]
})
export class EmpresaModule { }
