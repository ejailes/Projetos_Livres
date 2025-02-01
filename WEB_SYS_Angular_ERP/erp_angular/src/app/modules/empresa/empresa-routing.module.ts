import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresasComponent } from './empresas/empresas.component';
import { FormNovaComponent } from './form-nova/form-nova.component';
import { EmpresaRouterOutletComponent } from './empresa-router-outlet/empresa-router-outlet.component';
import { FormEditarComponent } from './form-editar/form-editar.component';
import { Html404Component } from '../shared/error-html/html404/html404.component';
import { HomeEmpresaSelecionadaComponent } from './home-empresa-selecionada/home-empresa-selecionada.component';
import { EmpresaGuard } from '../shared/guards/empresa.guard';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [   
  { path: "", component: EmpresasComponent, canActivate: [EmpresaGuard] },
  { path: "empresas/:id/clientes", loadChildren: () => import("../cliente/cliente-routing.module")
    .then(m => m.ClienteRoutingModule)  
  },
  { path: "empresas/:id/financeiro", loadChildren: () => import("../financeiro/financeiro-routing.module")
    .then(m => m.FinanceiroRoutingModule)
  },
  { path: "empresas/nova", component: FormNovaComponent },
  { 
    path: "empresas", component: EmpresaRouterOutletComponent, canActivateChild: [EmpresaGuard],
    children: [
      { path: ":id/editar", component: FormEditarComponent },
      { path: ":id/home", component: HomeEmpresaSelecionadaComponent },
      { path: "**", component: Html404Component }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
