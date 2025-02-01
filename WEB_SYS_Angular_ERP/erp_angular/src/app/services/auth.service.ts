import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConverterFactoryImpl } from 'src/adapted/converters/converterFactoryImpl';
import { HandlerNotificacaoImpl } from 'src/adapted/notificacao/handlerNotificacaoImpl';
import { NotificacaoBooleanObserver } from 'src/adapted/notificacao/observer/notificacaoBooleanObserver';
import { RepositoryFactoryLocalStorage } from 'src/adapted/repository/local/repositoryFactoryLocalStorage';
import { AuthController } from 'src/dominio/controller/authController';
import { UsuarioController } from 'src/dominio/controller/usuarioController';
import { HandlerNotificacao } from 'src/dominio/core/service/notificacao';
import { UsuarioIN, UsuarioOUT } from 'src/dominio/core/service/ports/io/usuario_IO';
import { ConverterFactory } from 'src/dominio/factories/converterFactory';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private notificacao;
  private authController: AuthController;
  private converters: ConverterFactory;
  private usuarioController: UsuarioController;
  private handlerNotificacao: HandlerNotificacao;

  constructor(private router: Router) {

    this.notificacao = new NotificacaoBooleanObserver;
    this.handlerNotificacao = new HandlerNotificacaoImpl(this.notificacao);
    this.converters = new ConverterFactoryImpl();
    this.authController = new AuthController(new RepositoryFactoryLocalStorage(), this.converters, this.handlerNotificacao);
    this.usuarioController = new UsuarioController(new RepositoryFactoryLocalStorage());

  }

  public login(usuario: UsuarioIN): void {
    this.authController.login(usuario);
    this.router.navigate(['empresas']);
  }

  public logout() {
    this.authController.logout();
  }

  public signup(usuario: UsuarioIN) {
    return this.usuarioController.novo(usuario);
  }

  public getNotificador() {
    return this.notificacao.getNotificadorObserver();
  }

  public notificationLoggedIn() {

    try {
      this.handlerNotificacao.execute();
      this.getLogged();
      return true;
    } catch (error) {
      return false;
    }

  }

  public getLogged(): UsuarioOUT {
    return this.authController.logged();
  }

}
