import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  baseUrl = '';
  constructor(private http: HttpClient) { }

  EliminarSolicitud(id: number):Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/solicitud/' + id);
  }
}
