import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteRouterOutletComponent } from './cliente-router-outlet/cliente-router-outlet.component';
import { EmpresaGuard } from '../shared/guards/empresa.guard';
import { FormNovoComponent } from './form-novo/form-novo.component';
import { FormEditarComponent } from './form-editar/form-editar.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  { 
    path: "", component: ClienteRouterOutletComponent,
    children: [
      { path: "", component: ClientesComponent, canActivate: [EmpresaGuard] },
      { path: ":id/editar", component: FormEditarComponent },
      { path: "novo", component: FormNovoComponent, canActivate: [EmpresaGuard] }
      
    ]
  }, 
  
];  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
