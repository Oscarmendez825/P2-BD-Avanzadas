import { Component } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';
import { GetServiceService } from 'src/app/services/get-service.service';



@Component({
  selector: 'app-programados',
  templateUrl: './programados.component.html',
  styleUrls: ['./programados.component.css']
})
export class ProgramadosComponent {

  
  constructor(private getService: GetServiceService) {}
  selectedDate: string = '';
  viajesProgramados: Solicitud[] = []; 

  consultarViajes() {
    this.getService.getViajesProgramados(this.selectedDate).subscribe({
      next: (res) => {
        this.viajesProgramados = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
