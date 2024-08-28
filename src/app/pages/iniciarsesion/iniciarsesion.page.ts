import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.page.html',
  styleUrls: ['./iniciarsesion.page.scss'],
})
export class IniciarsesionPage implements OnInit {

  constructor() { }

  ngOnInit() {
    return;
  }

  Usuario = {
    email: '',
    password: ''
  }

  onSubmit(){
    console.log(this.Usuario);
    window.location.href = "/home";
  }

}
