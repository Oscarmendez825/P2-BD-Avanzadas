import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { Solicitud } from '../models/solicitud';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private baseUrl = 'http://localhost:5000'

  constructor(private http: HttpClient) { }

  //Crear usuario
  //url example: http://localhost:8080/usuario
  //body example: usuario model
  //return: http ok or error
  CrerUsuario(usuario: Usuario):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/usuario', usuario)
  }

  //LogIn usuario
  //url example: http://localhost:8080/usuario/login
  //body example: usuario model(sin fullName)
  //return: http ok(chequear nombre de usuario, posicion y contraseña) or error(si algo no coincide)
  LogIn(usuario: Usuario):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/usuario/login', usuario)
  }

  //Crear solicitud
  //url example: http://localhost:8080/solicitud
  //body example: solicitud model
  //return: http ok or error
  CrearSolicitud(solicitud: Solicitud):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/solicitud', solicitud)
  }
}
