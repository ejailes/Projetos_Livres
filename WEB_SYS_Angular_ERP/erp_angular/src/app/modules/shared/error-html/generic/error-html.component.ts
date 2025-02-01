import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-html',
  templateUrl: './error-html.component.html',
  styleUrls: ['./error-html.component.css']
})
export class ErrorHTMLComponent implements OnInit {

  @Input()
  public error: string = "404";
  @Input()
  public msg: string = "Página não encontrada";
  @Input()
  public msgDetail: string = "A página que você procura não existe.";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public onClick() {
    this.router.navigate(['/empresas']);
  }

}
