import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { SolicitudComponent } from './pages/solicitud/solicitud.component';
import { ModificarComponent } from './pages/modificar/modificar.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { ValorarComponent } from './pages/valorar/valorar.component';
import { ProgramadosComponent } from './pages/programados/programados.component';
import { InternacionalesComponent } from './pages/internacionales/internacionales.component';
import { DestinosComponent } from './pages/destinos/destinos.component';

const routes: Routes = [{
    path: 'check',
    component: LayoutComponent, 
    children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'solicitud', component: SolicitudComponent },
      { path: 'modificar', component: ModificarComponent },
      { path: 'historial', component: HistorialComponent },
      { path: 'valorar', component: ValorarComponent },
      {path: 'programados', component: ProgramadosComponent},
      {path: 'internacionales', component: InternacionalesComponent},
      {path: 'destinos', component: DestinosComponent},
      { path: '**', redirectTo: 'inicio', pathMatch: 'full'}
    ]
  },
  {path:'',
  children: [
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full'}]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
