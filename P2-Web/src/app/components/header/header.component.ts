import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen = false;
  isAdmin = true;

  ngOnInit() {
    // Cargar la lista de destinos al inicializar el componente
    this.isAdmin = this.cookieService.get('isAdmin') == 'true';
    console.log(this.isAdmin);
  }
  constructor(private cookieService: CookieService){}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
