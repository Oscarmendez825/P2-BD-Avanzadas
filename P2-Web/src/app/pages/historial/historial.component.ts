import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Solicitud } from 'src/app/models/solicitud';
import { GetServiceService } from 'src/app/services/get-service.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
})
export class HistorialComponent {
  solicitudes: Solicitud[] = [];

  constructor(
    private getService: GetServiceService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.getUsuarioSolicitudes();
  }

  getUsuarioSolicitudes() {
    this.getService
      .getSolicitudesUsuario(this.cookieService.get('username'))
      .subscribe({
        next: (res) => {
          this.solicitudes = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
