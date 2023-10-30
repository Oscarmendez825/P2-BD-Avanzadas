import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { PostServiceService } from 'src/app/services/post-service.service';

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

  constructor(private postService: PostServiceService){}

  Register(){
    this.postService.CrerUsuario(this.newUser).subscribe({
      next: (res) => {
        location.href = 'check/login';
      },
      error: (err) => {
        console.log(err);
      }
    });
    
  }

}
