import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, respuestaAgregarUnirmeClase, respuestaCrearClase, respuestaMisClasesCreadas } from '../interfaces';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CApisService {

  private _storage: Storage | null = null;

  constructor( private http: HttpClient, private storage: Storage) { this.init();}
  
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

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

    return this.http.post<respuestaAgregarUnirmeClase>('https://loboteam.aftermatch.website/api/clases-students',agregar)
  }

  PostUnirmeClase(token:string, code: string){
    var unirme = {
      "token": token,
      "code": code
    }
    return this.http.post<respuestaAgregarUnirmeClase>('https://loboteam.aftermatch.website/api/join-class',unirme)
  }

  PostCrearClase(token:string, name: string, description: string){
    var crearClase = {
      "token": token,
      "name": name,
      "descripcion": description,
      "icono": "icono-ing"
    }

    return this.http.post<respuestaCrearClase>('https://loboteam.aftermatch.website/api/clases',crearClase)
  }

  PostVerMisClasesCreadas(token:string){
    var misClases = {
      "token": token
    }

    return this.http.post<respuestaMisClasesCreadas>('https://loboteam.aftermatch.website/api/viewmyclass',misClases)
  }

  async GuardarToken(token:string){
    await this._storage?.set('token',token);
    return;
  }

  async obtenerToken(): Promise<any> {
    return await this._storage?.get('token');
  }

  async eliminarToken() {
    await this._storage?.remove('token');
  }
  
  async existeToken(): Promise<boolean> {
    const valor = await this._storage?.get('token');
    return valor !== null && valor !== undefined;
  }
  
  

}
