import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { SolicitudComponent } from './pages/solicitud/solicitud.component';
import { ModificarComponent } from './pages/modificar/modificar.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { ValorarComponent } from './pages/valorar/valorar.component';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ProgramadosComponent } from './pages/programados/programados.component';
import { InternacionalesComponent } from './pages/internacionales/internacionales.component';
import { DestinosComponent } from './pages/destinos/destinos.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    SolicitudComponent,
    ModificarComponent,
    HistorialComponent,
    ValorarComponent,
    ProgramadosComponent,
    InternacionalesComponent,
    DestinosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    // Agrega los iconos al módulo
    library.add(fas);
  }
 }
