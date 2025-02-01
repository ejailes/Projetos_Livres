import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { notificacaoEmpresaOUTObserver } from "src/adapted/notificacao/observer/notificacaoEmpresaOUTObserver";
import { AuthService } from "src/app/services/auth.service";
import { EmpresaService } from "src/app/services/empresa.service";
import { KeysEnum, NotificacaoListenersService } from "src/app/services/listeners/notificacao-listeners.service";
import { EmpresaOUT } from "src/dominio/core/service/ports/io/empresa_IO";

@Injectable()
export class EmpresaGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService,
    private empresaService: EmpresaService, private notificacaoListeners: NotificacaoListenersService,
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    this.removerMenusEmpresa(state);
    return this.inRouter(state, route);

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.inRouter(state, childRoute);
  }

  private removerMenusEmpresa(state: RouterStateSnapshot) {

    let pathEmpresa = state.root.children[0].children[0];

    if (!pathEmpresa.params["id"] && state.url.includes("empresas")) {
      let notificacao = this.notificacaoListeners.getNotificacao(KeysEnum.Menu);
      notificacao?.setValue(false);
      notificacao?.notificar();
    }
  }

  private inRouter(state: RouterStateSnapshot, childRoute: ActivatedRouteSnapshot): boolean {

    let result: boolean = true; 

    if (state.url.includes("home")) {
      result = this.getEmpresa(state, childRoute, result);
      if (result) {
        let notificacao = this.notificacaoListeners.getNotificacao(KeysEnum.Menu);
        notificacao?.setValue(true);
        notificacao?.notificar();
      }
    }

    if (this.includeUrl(state)) {
      result = this.getEmpresa(state, childRoute, result);
    }

    return result;
  }

  private includeUrl(state: RouterStateSnapshot): boolean {

    const urls: string[] = ["clientes", "financeiro", "editar"];
    return urls.some(url => state.url.includes(url));

  }

  private getEmpresa(state: RouterStateSnapshot, childRoute: ActivatedRouteSnapshot, result: boolean) {

    try {

      let id = this.getIDEmpresa(state, childRoute);
      result = this.checkPermissionUser(id);
      let empresa = this.empresaService.pesquisarPorID(id);

      this.notificacaoListeners.setNotificacao(KeysEnum.EmpresaOUT, new notificacaoEmpresaOUTObserver(empresa));

    } catch (error) {
      console.log("Error: ", (error as Error).message);
      this.router.navigate(['empresas']);
      result = false;
    }
    return result;
  }

  private getIDEmpresa(state: RouterStateSnapshot, childRoute: ActivatedRouteSnapshot): number {

    let pathEmpresa = state.root.children[0].children[0];
    if (!pathEmpresa.params["id"]) {
      throw new Error("Empresa sem ID");
    }

    let id = Number.parseInt(pathEmpresa.params["id"]);
    if (isNaN(id)) {
      throw new Error("Empresa com ID Inválido");
    }

    return id;

  }

  private checkPermissionUser(id: number) {

    let empresa = this.getEmpresaPorID(id);
    if (empresa.getIDUsuario() === this.authService.getLogged().getEmail()) {
      return true;
    }

    return false;
  }

  private getEmpresaPorID(id: number): EmpresaOUT {
    return this.empresaService.pesquisarPorID(id);
  }

}