import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  constructor() { }

  ngOnInit() {
    return;
  }

  Usuario = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmpassword: ''
  }

  onSubmit(){
    if(this.Usuario.password == this.Usuario.confirmpassword){
      console.log(this.Usuario);
      window.location.href = "/registro-exitoso";
    }else{
      console.log('La contraseña no coincide');
    }
  }

}
