import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { CookieService } from 'ngx-cookie-service';
import { PostServiceService } from 'src/app/services/post-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: Usuario = {
    password: '',
    email: '',
    position: '',
  };

  constructor(
    private cookieService: CookieService,
    private postService: PostServiceService,
  ) {}

  ngOnInit(): void {
  }

  LogIn() {
    this.postService.LogIn(this.user).subscribe({
      next: (res) => {
        console.log(res);
        if (this.user.position == 'Admin') {
          this.cookieService.set('isAdmin', 'true');
        }
        else {
          this.cookieService.set('isAdmin', 'false');
        }
        this.cookieService.set('username', this.user.email);
        location.href = 'check/inicio';
      },
      error: (err) => {
        this.cookieService.set('isAdmin', 'false');
      }
    });
    
  }

  Register() {
    location.href = 'registro';
  }

}
