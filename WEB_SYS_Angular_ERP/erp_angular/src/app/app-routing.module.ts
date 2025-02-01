import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: "", loadChildren: () => import("./modules/auth/auth-routing.module")
      .then(m => m.AuthRoutingModule)
  },
  {
    path: "empresas", canLoad: [AuthGuard], loadChildren: () => import("./modules/empresa/empresa-routing.module")
      .then(m => m.EmpresaRoutingModule)
  },
  { 
    path: "", redirectTo: "", pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
