import { Component } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent {
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

  NewRequest() {
    console.log(this.solicitud);
  }
}
