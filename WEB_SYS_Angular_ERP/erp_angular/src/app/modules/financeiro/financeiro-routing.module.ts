import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContasComponent } from './contas/contas.component';
import { ContaRouterOutletComponent } from './conta-router-outlet/conta-router-outlet.component';
import { FormNovaComponent } from './form-nova/form-nova.component';
import { EmpresaGuard } from '../shared/guards/empresa.guard';
import { HomeComponent } from './lancamentos/home/home.component';

const routes: Routes =
  [
    { path: "", component: ContaRouterOutletComponent,
      children: [
        { path: "", component: ContasComponent, canActivate: [EmpresaGuard] },
        { path: "contas", component: ContasComponent, canActivate: [EmpresaGuard] },
        { path: "contas/nova", component: FormNovaComponent, canActivate: [EmpresaGuard] },
        { path: "contas/:id/lancamentos", component: HomeComponent, canActivate: [EmpresaGuard] }
      ]
     } 
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceiroRoutingModule { }
