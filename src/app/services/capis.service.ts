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

    return this.http.post<LoginResponse>('https://loboteam.aftermatch.website/api/login',usuario)
    
  }

  PostRegistrarse(name:string, email:string, password:string, cpassword: string){
    var registro = {
      "name": name,
      "email": email,
      "password": password
      //"password_confirmation": cpassword
    }

    return this.http.post('https://loboteam.aftermatch.website/api/students',registro)
  }

  PostAgregarEstudiante(idclass: number, idstudent: number){
    var agregar = {
      "clase_id": idclass,
      "student_id": idstudent
    }

    return this.http.post('https://loboteam.aftermatch.website/api/clases-students',agregar)
  }

  PostUnirmeClase(token:string, code: string){
    var unirme = {
      "token": token,
      "code": code
    }
    return this.http.post('https://loboteam.aftermatch.website/api/join-class',unirme)
  }

}
