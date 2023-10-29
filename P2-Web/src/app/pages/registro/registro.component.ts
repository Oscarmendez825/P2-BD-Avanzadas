import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  newUser: Usuario = {
    fullName: '',
    password: '',
    email: '',
    position: ''
  }

  Register(){
    console.log(this.newUser)
  }

}
