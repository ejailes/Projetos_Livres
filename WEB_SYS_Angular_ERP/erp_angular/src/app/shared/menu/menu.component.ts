import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificacaoBooleanObserver } from 'src/adapted/notificacao/observer/notificacaoBooleanObserver';
import { AuthService } from 'src/app/services/auth.service';
import { KeysEnum, NotificacaoListenersService } from 'src/app/services/listeners/notificacao-listeners.service';
import { EmpresaOUT } from 'src/dominio/core/service/ports/io/empresa_IO';
import { UsuarioOUT } from 'src/dominio/core/service/ports/io/usuario_IO';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  public usuario: UsuarioOUT | null = null;
  private subscription?: Subscription;
  public inEmpresa: boolean = false;
  public empresa?: EmpresaOUT;
  public inMenu:string = "home";

  constructor(private auth: AuthService, private router: Router,
    private notificacaoListeners: NotificacaoListenersService) {
  }
 
  ngOnInit(): void {
    this.subscribeLogin(); 
    this.notificacaoListeners.setNotificacao(KeysEnum.Menu, new NotificacaoBooleanObserver()).notificar();
    this.subscribeMenuHome();
  }
 
  private subscribeLogin(){
    this.subscription = this.auth.getNotificador().subscribe(value => {
      try {
        this.usuario = this.auth.getLogged();
      } catch (error) {
        this.resetUsuario();
      } 
    });
  }

  private subscribeMenuHome() {
    this.notificacaoListeners.getNotificacao(KeysEnum.Menu)?.getListiner().subscribe(value => {
      this.inEmpresa = value;
      if(!this.inEmpresa){
        this.inMenu = "home";
      }
      this.empresa = this.notificacaoListeners.getNotificacao(KeysEnum.EmpresaOUT)?.getValue();
    })
  } 

  public onClickMenu(label:string): void {
    this.inMenu = label;
  }

  private resetUsuario() {
    this.usuario = null;
    this.router.navigate(['auth/login']);
  }

  public onLogout() {
    this.auth.logout();
  }

  ngOnDestroy(): void {
    this.notificacaoListeners.destroyNotificacao(KeysEnum.Menu);
    this.subscription?.unsubscribe();
    this.resetUsuario();
  }

}
