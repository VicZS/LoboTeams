import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { CApisService } from 'src/app/services/capis.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  constructor(private cliente:CApisService,
    private alert: AlertController,
    private loadCtr:LoadingController
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.SesionAbierta();
    }, 500);
    return;
  }

  async presentLoading() {
    const loading = await this.loadCtr.create({
      message: 'Cargando...',
      duration: 1000,
      spinner: 'bubbles'
    });
    await loading.present();
  }

  Usuario = {
    nombre: '',
    // apellido: '',
    email: '',
    password: '',
    confirmpassword: ''
  }

  onSubmit(){
    this.SesionAbierta();
    this.presentLoading();
    
    if(this.Usuario.password == this.Usuario.confirmpassword){

      if(this.Usuario.password.length >= 8){
        if(this.esEmailValido(this.Usuario.email)){
          console.log(this.Usuario);

          this.cliente.PostRegistrarse(this.Usuario.nombre, this.Usuario.email, this.Usuario.password, this.Usuario.confirmpassword).subscribe(
            response => {
              
              console.log(response)
              window.location.href = "/registro-exitoso";
            },
            error => {
              console.error("Error de registro");
              this.Alerta('El email ya esta en uso.')
            }
          );

        }else{
          console.log('El email no es valido');
          this.Alerta('El email no es valido')
        }

      }else{
        console.log('La contraseña debe tener al menos 8 caracteres');
        this.Alerta('La contraseña debe tener al menos 8 caracteres')
      }
      
    }else{
      console.log('La contraseña no coincide');
      this.Alerta('La contraseña no coincide')
    }
  }

  async Alerta(msg:string){
    const Al= await this.alert.create({
      header:"Error",
      message: msg,
      buttons: ['Cerrar']
    });
    await Al.present();
  }

  esEmailValido(email: string): boolean {
    // Expresión regular para validar correo electrónico
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexEmail.test(email);
  }

  async SesionAbierta(){
    var SesionA = await this.cliente.existeToken();
    if(SesionA){
      window.location.href = "/home";
    }
  }

}
