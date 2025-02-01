import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModalService } from '../services/modal.service';
import { delay, tap } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private readonly delayRequest: number = 3000;
  constructor(private modal: ModalService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.modal.openModalLoader();
    return next.handle(request).pipe(
      delay(this.delayRequest),
      tap({
        next: (event) => {
          this.loaderModal(event);
        },
        error: (error) => {
          this.alertaDanger("Error ao carregar...");
        }
      }));
  }

  private loaderModal(event: HttpEvent<any>) {
    if (event instanceof HttpResponse) {
      if ("erro" in event.body) {
        this.alertaDanger("Error ao carregar...");
      } else {
        this.modal.close();
      }
    }
  }

  private alertaDanger(msg: string) {
    this.modal.openModalAlertaDanger(msg);
  }

}
