import { Component } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';
import { GetServiceService } from 'src/app/services/get-service.service';

@Component({
  selector: 'app-internacionales',
  templateUrl: './internacionales.component.html',
  styleUrls: ['./internacionales.component.css']
})
export class InternacionalesComponent {
  selectedQuarter: string = '';
  selectedYear: number = 0;
  viajesInternacionales: Solicitud[] = []; // Ajusta el tipo según la respuesta real del API

  constructor(private getService: GetServiceService) {}

  consultarViajes() {
    this.getService.getViajesInternacionales(this.selectedQuarter, this.selectedYear).subscribe({
      next: (res) => {
        this.viajesInternacionales = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
