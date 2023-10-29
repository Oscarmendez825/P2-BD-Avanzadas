import { Component } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.component.html',
  styleUrls: ['./destinos.component.css']
})
export class DestinosComponent {
  destinos: string[]  = [
    'París, Francia',
    'Nueva York, Estados Unidos',
    'Roma, Italia',
    'Tokio, Japón',
    'Londres, Reino Unido',
    'Sídney, Australia',
    'Ciudad de México, México',
    'Bali, Indonesia',
    'Atenas, Grecia',
    'Praga, República Checa',
    'Río de Janeiro, Brasil',
    'Barcelona, España',
    'Cairo, Egipto',
    'Ciudad del Cabo, Sudáfrica',
    'Toronto, Canadá',
    'Kioto, Japón',
    'Moscú, Rusia',
    'Dubái, Emiratos Árabes Unidos',
    'Bangkok, Tailandia',
    'Ámsterdam, Países Bajos',
    'Viena, Austria',
    'Estocolmo, Suecia',
    'Los Ángeles, Estados Unidos',
    'Hawai, Estados Unidos',
    'Nueva Delhi, India',
    'Santorini, Grecia',
    'Marrakech, Marruecos',
    'Pekín, China',
    'Berlín, Alemania',
    'Machu Picchu, Perú',
  ];

  selectedDestino: string = '';
  viajesPorDestino: Solicitud[] = []; // Ajusta el tipo según la respuesta real del API

  constructor() {}

  ngOnInit() {
    // Cargar la lista de destinos al inicializar el componente
    this.cargarDestinos();
  }

  cargarDestinos() {
  }

  consultarPorDestino() {
    this.viajesPorDestino =  [
      {
        "fullName": "Juan Pérez",
        "position": "Gerente de Proyectos",
        "department": "Departamento de Proyectos",
        "international": true,
        "destinationCountry": "Estados Unidos",
        "tripPurpose": "Reunión de negocios",
        "startDate": new Date("2023-10-15"),
        "endDate": new Date("2023-10-20"),
        "airline": "American Airlines",
        "ticketPrice": 800,
        "accommodation": "Hotel Marriott",
        "requiresTransport": true,
        "status": "Aprobada"
      },
      {
        "fullName": "Maria Rodríguez",
        "position": "Analista de Marketing",
        "department": "Departamento de Marketing",
        "international": false,
        "destinationCountry": "N/A",
        "tripPurpose": "Capacitación interna",
        "startDate": new Date("2023-10-10"),
        "endDate": new Date("2023-10-12"),
        "airline": "N/A",
        "ticketPrice": 0,
        "accommodation": "Oficina central",
        "requiresTransport": false,
        "status": "Aprobada"
      },
      {
        "fullName": "Luis Gómez",
        "position": "Ingeniero de Software",
        "department": "Departamento de Desarrollo",
        "international": true,
        "destinationCountry": "Francia",
        "tripPurpose": "Desarrollo de software",
        "startDate": new Date("2023-11-05"),
        "endDate": new Date("2023-11-10"),
        "airline": "Air France",
        "ticketPrice": 1200,
        "accommodation": "Hotel Paris",
        "requiresTransport": true,
        "status": "Aprobada"
      }
    ];
  }
}
