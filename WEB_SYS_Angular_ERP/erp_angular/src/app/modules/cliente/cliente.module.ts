import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteRouterOutletComponent } from './cliente-router-outlet/cliente-router-outlet.component';
import { FormNovoComponent } from './form-novo/form-novo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DirectivesModule } from '../directives/directives.module';
import { NgxMaskModule } from 'ngx-mask';
import { FormEditarComponent } from './form-editar/form-editar.component';
 

@NgModule({
  declarations: [
    ClientesComponent,
    ClienteRouterOutletComponent,
    FormNovoComponent,
    FormEditarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DirectivesModule,
    NgxMaskModule.forRoot(),
    ClienteRoutingModule 
  ]
}) 
export class ClienteModule { }
