import { Component, OnInit } from '@angular/core';
import { CApisService } from '../../services/capis.service';
import { LoginResponse } from '../../interfaces';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.page.html',
  styleUrls: ['./iniciarsesion.page.scss'],
})
export class IniciarsesionPage implements OnInit {

  constructor( private cliente: CApisService, 
               private alert: AlertController
  ) { }

  ngOnInit() {

    // this.cliente.get().subscribe(
    //   posts =>{
    //     console.log(posts)
    //   }
    // )

    // this.cliente.post().subscribe(
    //   response => {
    //     console.log(response);
    //   },
    //   error => {
    //     console.error("Error al hacer la solicitud:", error);
    //   }
    // );
    
    setTimeout(() => {
      this.SesionAbierta();
    }, 500);
    
    return;
  }

  Usuario = {
    email: '',
    password: ''
  }

  onSubmit(){
    this.SesionAbierta();
    
    console.log(this.Usuario);

    this.cliente.PostIniciarSesion(this.Usuario.email, this.Usuario.password).subscribe(
      response => {
        
        const message = response.message;
        const user = response.user;
        const token = response.token;

        console.log(message);
        console.log(user);
        console.log(token);

        this.GuardarT(token);

        window.location.href = "/home";
      },
      error => {
        console.error("Error: Correo y/o Contraseña no existen o son erroneos");
        this.Alerta();
      }
    );

    
  }

  async Alerta(){
    const Al= await this.alert.create({
      header:"Error",
      message: "El Correo y/o Contraseña no existen o son incorrectos",
      buttons: ['Cerrar']
    });
    await Al.present();
  }

  async GuardarT(token:string){
    await this.cliente.GuardarToken(token);
    console.log('Token Guardado');
  }

  async SesionAbierta(){
    var SesionA = await this.cliente.existeToken();
    if(SesionA){
      window.location.href = "/home";
    }
  }

}
