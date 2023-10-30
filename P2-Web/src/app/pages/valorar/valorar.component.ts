import { Component } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';
import { GetServiceService } from 'src/app/services/get-service.service';
import { PutServiceService } from 'src/app/services/put-service.service';

@Component({
  selector: 'app-valorar',
  templateUrl: './valorar.component.html',
  styleUrls: ['./valorar.component.css']
})
export class ValorarComponent {
  solicitudes:Solicitud[] = [];

  constructor(private getService: GetServiceService, private putService: PutServiceService) { }

  ngOnInit(): void {
    this.getSolicitudesPendientes();
  }

  aprobarSolicitud(solicitud: any) {
    solicitud.status = 'Aprobada';
    this.putService.ModificarSolicitud(solicitud.id, solicitud).subscribe({
      next: (res) => {
        location.href = 'check/valorar';
      },
      error: (err) => {
        console.log(err);
      },
    });

  }

  rechazarSolicitud(solicitud: any) {
    solicitud.status = 'Rechazada';
    this.putService.ModificarSolicitud(solicitud.id, solicitud).subscribe({
      next: (res) => {
        location.href = 'check/valorar';
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getSolicitudesPendientes() {
    this.getService.getSolicitudesPendientes().subscribe({
      next: (res) => {
        this.solicitudes = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
