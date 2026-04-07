import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';  // ← Importa Router
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { Toast } from './shared/toast/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,     // ← Necesario para routing
    RouterOutlet,     // ← Donde se renderizan las páginas
    Navbar,           // ← En todas las páginas
    Footer,           // ← En todas las páginas
    Toast             // ← Sistema global de notificaciones
  ],
  template: `
    <div class="app-container">
      <app-navbar></app-navbar>
      
      <main class="main-content">
        <!-- Aquí se renderiza el contenido según la ruta -->
        <router-outlet></router-outlet>
      </main>
      
      <app-footer></app-footer>
      <app-toast></app-toast>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-content {
      flex: 1;
      padding-top: 20px;  /* Espacio después del navbar fijo */
    }

    /* Asegura que el contenido no quede detrás del navbar */
    .main-content {
      margin-top: 80px;  /* Altura aproximada del navbar */
    }

    @media (max-width: 768px) {
      .main-content {
        margin-top: 70px;
      }
    }
  `]
})
export class App {
  title = 'Fukurō';
}