import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetServiceService {

  baseUrl = 'http://localhost:5000';
  constructor(private http: HttpClient) { }

  //Obtener solicitudes de un usuario por email
  //url example: http://localhost:8080/solicitud/usuario/{email}
  //return: array de Jsons con las solicitudes del usuario
  getSolicitudesUsuario(email: string):Observable<any> {
    return this.http.get<any>(this.baseUrl + '/solicitud/usuario/' + email);
  }

  //Obtener una solicitud por id
  //url example: http://localhost:8080/solicitud/{id}
  //return: Json con la solicitud
  getSolicitud(id: number):Observable<any> {
    return this.http.get<any>(this.baseUrl + '/solicitud/' + id);
  }

  //Obtener todas las solicitudes pendientes
  //url example: http://localhost:8080/solicitud/pendientes
  //return: array de Jsons con las solicitudes pendientes
  getSolicitudesPendientes():Observable<any> {
    return this.http.get<any>(this.baseUrl + '/solicitud/pendientes');
  }

  //Obtener todas las solicitudes por mes y año
  //url example: http://localhost:8080/solicitud/mes/{2023-01}
  //return: array de Jsons con las solicitudes del mes y año
  getViajesProgramados(date:string):Observable<any> {
    return this.http.get<any>(this.baseUrl + '/solicitud/mes/' + date);
  }

  //Obtener todas las solicitudes por trimestre y año
  //url example: http://localhost:8080/solicitud/trimestre/1/2023
  getViajesInternacionales(quarter:string, year:number):Observable<any> {
    return this.http.get<any>(this.baseUrl + '/solicitud/internacionales/' + quarter + '/' + year);
  }

  //Obtener todos los destinos de los viajes
  //url example: http://localhost:8080/solicitud/destino
  //return: array de Jsons con los destinos(modelo countryDestination)
  getDestinos():Observable<any> {
    return this.http.get<any>(this.baseUrl + '/solicitud/destino');
  }

  //Obtener todas las solicitudes por destino
  //url example: http://localhost:8080/solicitud/destino/{destino}
  //return: array de Jsons con las solicitudes del destino
  getViajesPorDestino(destino: string):Observable<any> {
    return this.http.get<any>(this.baseUrl + '/solicitud/destino/' + destino);
  }
}
