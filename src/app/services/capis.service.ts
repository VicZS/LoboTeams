import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CApisService {

  constructor( private http: HttpClient) { }

  get(){
    
    return this.http.get('https://brown-patsy-73.tiiny.io/')
  }

  post(){
    var juan = {
      "nombre": "Juan"
    }

    return this.http.post('https://brown-patsy-73.tiiny.io/hola',juan)
  }

  PostIniciarSesion(email:string , password: string){
    var usuario = {
      "email" : email,
      "password" : password
    }

    return this.http.post<LoginResponse>('https://aftermatch.website/api/loginAPI',usuario)
    
  }

  PostRegistrarse(name:string, email:string, password:string, cpassword: string){
    var registro = {
      "name": name,
      "email": email,
      "password": password,
      "password_confirmation": cpassword
    }

    return this.http.post('https://aftermatch.website/api/registrarseAPI',registro)
  }
}
