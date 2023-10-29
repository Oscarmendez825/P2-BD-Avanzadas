import { Component } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent {
  solicitudes: Solicitud[] = [];
}
