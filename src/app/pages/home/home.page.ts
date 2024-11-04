import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
    return;
  }

  IrChats(){
    return;
  }

  IrCalendario(){
    window.location.href = "/calendario"
  }

  IrActividades(){
    return;
  }

  IrConfiguracion(){
    return;
  }

  Salir(){
    window.location.href = "/inicio";
  }

}
