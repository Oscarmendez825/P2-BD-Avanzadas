import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Solicitud } from 'src/app/models/solicitud';
import { DeleteService } from 'src/app/services/delete.service';
import { GetServiceService } from 'src/app/services/get-service.service';
import { PutServiceService } from 'src/app/services/put-service.service';
import {Usuario} from "../../models/usuario";

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css'],
})
export class ModificarComponent {
  solicitudes: Solicitud[] = [];
  solicitudSeleccionada: number = 0;

  constructor(
    private putService: PutServiceService,
    private deleteService: DeleteService,
    private getService: GetServiceService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.getUsuarioSolicitudes();
  }
  user = JSON.parse(this.cookieService.get('user') || '{}') as Usuario;


  solicitud: Solicitud = {
    fullName: this.user.fullName || '',
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
    email: this.user.email,
    requiresTransport: false,
  };

  checkChange(selectedId: number) {
    this.solicitudSeleccionada = selectedId;
    this.getService.getSolicitud(selectedId).subscribe({
      next: (res) => {
        this.solicitud = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  submit() {
    this.putService
      .ModificarSolicitud(this.solicitudSeleccionada, this.solicitud)
      .subscribe({
        next: (res) => {
          location.href = 'check/modificar';
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  eliminarSolicitud() {
    this.deleteService.EliminarSolicitud(this.solicitudSeleccionada).subscribe({
      next: (res) => {
        location.href = 'check/modificar';
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getUsuarioSolicitudes() {
    this.getService
      .getSolicitudesUsuario(this.user.email)
      .subscribe({
        next: (res) => {
          console.log(res);
          res.forEach((element: any) => {
            element._id = element._id.$oid;
          });
          console.log(res);
          this.solicitudes = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
