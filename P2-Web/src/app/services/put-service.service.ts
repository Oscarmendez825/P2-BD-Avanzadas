import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Solicitud } from '../models/solicitud';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PutServiceService {

  baseUrl = '';
  constructor(private http: HttpClient) { }

  //Modificar solicitud por id
  //url example: http://localhost:8080/solicitud/{id}
  //body example: solicitud model
  //return: http ok or error
  ModificarSolicitud(id: number, solicitud: Solicitud):Observable<any>{
    return this.http.put<any>(this.baseUrl + '/solicitud/' + id, solicitud)
  }
}
