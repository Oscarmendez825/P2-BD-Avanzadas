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
        if (res.position.includes("admin")) {
          console.log('admin');
          this.cookieService.set('isAdmin', 'true');
        }
        else {
          console.log('no admin');
          this.cookieService.set('isAdmin', 'false');
        }
        this.cookieService.set('username', this.user.email);
        localStorage.setItem('user', JSON.stringify(res));
        this.cookieService.set('user', JSON.stringify(res));
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
