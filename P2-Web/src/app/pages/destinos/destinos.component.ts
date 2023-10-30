import { Component } from '@angular/core';
import { CountryDestination } from 'src/app/models/country-destination';
import { Solicitud } from 'src/app/models/solicitud';
import { GetServiceService } from 'src/app/services/get-service.service';

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.component.html',
  styleUrls: ['./destinos.component.css']
})
export class DestinosComponent {
  destinos: CountryDestination[] = [];

  selectedDestino: string = '';
  viajesPorDestino: Solicitud[] = []; 

  constructor(private getService: GetServiceService) {}

  ngOnInit() {
    // Cargar la lista de destinos al inicializar el componente
    this.cargarDestinos();
  }

  cargarDestinos() {
    this.getService.getDestinos().subscribe({
      next: (res) => {
        this.destinos = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  consultarPorDestino(selectedDestino: string) {
    this.getService.getViajesPorDestino(selectedDestino).subscribe({
      next: (res) => {
        this.viajesPorDestino = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
    
  }
}
