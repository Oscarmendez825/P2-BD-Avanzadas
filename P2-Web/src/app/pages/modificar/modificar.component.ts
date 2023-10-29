import { Component } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent {

  solicitudes:any[] = [{destino: "a"},{destino: "b"},{destino: "c"}]
  solicitudSeleccionada:string = ''

  solicitud: Solicitud = {
    fullName: '',
    position: '',
    department: '',
    international: false,
    destinationCountry: '',
    tripPurpose: '',
    startDate: new Date(),
    endDate: new Date(),
    airline: '',
    ticketPrice: 0,
    accommodation: '',
    requiresTransport: false,
  }

  checkChange() {
    this.solicitudSeleccionada = 'hola'
  }

  eliminarSolicitud() {
  }
}