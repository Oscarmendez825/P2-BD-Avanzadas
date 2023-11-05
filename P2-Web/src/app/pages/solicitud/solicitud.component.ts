import {Component} from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';
import { PostServiceService } from 'src/app/services/post-service.service';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent{
  user = JSON.parse(this.cookieService.get('user') || '{}');
  solicitud: Solicitud = {
    fullName: this.user.fullName,
    position: this.user.position,
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
    status: 'Pendiente',
    email: this.user.email,
  }
  constructor(private postService:PostServiceService, private cookieService: CookieService,) { }

  NewRequest() {
    //check if all fields are filled
    if (this.solicitud.fullName == '' || this.solicitud.position == '' || this.solicitud.department == '' || this.solicitud.destinationCountry == '' || this.solicitud.tripPurpose == '' || this.solicitud.airline == '' || this.solicitud.accommodation == '') {
      alert('Por favor llene todos los campos');
      return;
    }
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
