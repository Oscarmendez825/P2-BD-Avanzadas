import { Component } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';
import { PostServiceService } from 'src/app/services/post-service.service';

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
  constructor(private postService:PostServiceService) { }

  NewRequest() {
    this.postService.CrearSolicitud(this.solicitud).subscribe({
      next: (res) => {
        location.href = 'check/solicitud';
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
