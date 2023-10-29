import { Component } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';

@Component({
  selector: 'app-valorar',
  templateUrl: './valorar.component.html',
  styleUrls: ['./valorar.component.css']
})
export class ValorarComponent {
  solicitudes:Solicitud[] = [
    {
      fullName: 'Juan Pérez',
      position: 'Gerente de Proyectos',
      department: 'Proyectos',
      international: true,
      destinationCountry: 'Estados Unidos',
      tripPurpose: 'Reunión de negocios',
      startDate: new Date('2023-11-01'),
      endDate: new Date('2023-11-10'),
      airline: 'American Airlines',
      ticketPrice: 800,
      accommodation: 'Hotel',
      requiresTransport: true
    },
    {
      fullName: 'María González',
      position: 'Analista de Marketing',
      department: 'Marketing',
      international: false,
      destinationCountry: 'N/A',
      tripPurpose: 'Seminario en línea',
      startDate: new Date('2023-11-05'),
      endDate: new Date('2023-11-07'),
      airline: '',
      ticketPrice: 0,
      accommodation: 'N/A',
      requiresTransport: false
    },
    {
      fullName: 'Carlos Rodríguez',
      position: 'Ingeniero de Software',
      department: 'Tecnología',
      international: true,
      destinationCountry: 'Canadá',
      tripPurpose: 'Desarrollo de software',
      startDate: new Date('2023-11-15'),
      endDate: new Date('2023-11-25'),
      airline: 'Air Canada',
      ticketPrice: 1200,
      accommodation: 'Apartamento',
      requiresTransport: true
    }
  ];

  aprobarSolicitud(solicitud: any) {
    // Lógica para aprobar la solicitud, puedes enviar una solicitud al servidor aqu
  }

  rechazarSolicitud(solicitud: any) {
    // Lógica para rechazar la solicitud, puedes enviar una solicitud al servidor aquí
  }
}
