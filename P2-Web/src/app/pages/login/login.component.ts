import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: Usuario = {
    password: '',
    email: '',
    position: ''
  }

  constructor(private cookieService: CookieService){}

  LogIn(){
    console.log(this.user)
    this.cookieService.set('isAdmin', 'true')
  }

  Register(){
    location.href = "registro"
  }
}
