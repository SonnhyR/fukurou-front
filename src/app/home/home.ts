import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastService } from '../core/services/toast.service';

interface RecentBook {
  id: number;
  title: string;
  author: string;
  genre: string;
  coverColor: string;
  progress: number;
  isNew: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  showDemoModal = true;

  recentBooks: RecentBook[] = [
    { id: 1, title: 'Sombras del Amanecer', author: 'María Rodríguez', genre: 'Fantasy', coverColor: '#FF6B6B', progress: 85, isNew: true },
    { id: 2, title: 'Corazones de Cristal', author: 'Carlos Méndez', genre: 'Romance', coverColor: '#4ECDC4', progress: 45, isNew: true },
    { id: 3, title: 'El Último Hechicero', author: 'Ana López', genre: 'Fantasy', coverColor: '#FFD166', progress: 100, isNew: false },
    { id: 4, title: 'Susurros en la Oscuridad', author: 'David Kim', genre: 'Thriller', coverColor: '#06D6A0', progress: 30, isNew: true },
    { id: 5, title: 'Reinos Perdidos', author: 'Laura Chen', genre: 'Adventure', coverColor: '#118AB2', progress: 70, isNew: false },
    { id: 6, title: 'Amor en Tiempos de Caos', author: 'Sofía Martín', genre: 'Romance', coverColor: '#EF476F', progress: 60, isNew: true },
  ];
  
  featuredBook = {
    title: 'La Canción del Búho',
    author: 'Catalina López',
    description: 'Una historia épica de fantasía oscura que ha cautivado a miles de lectores',
    stats: {
      readers: '15.2K',
      chapters: 42,
      rating: 4.8
    }
  };

  newsList = [
    { tag: 'Evento', title: 'Fukurō Writer Contest 2026', date: 'Apertura: 15 de Mayo' },
    { tag: 'Actualización', title: 'Nuevas herramientas de Fanfics integradas', date: 'Reciente' },
    { tag: 'Comunidad', title: 'Gala de Premios de Novelas Fantásticas', date: 'Próximamente' }
  ];

  featuredPlaylists = [
    { title: 'Tensión Épica (Combates)', author: 'Fukurō Music', cover: '#5D4037', tracks: 12 },
    { title: 'Lluvia y Romance', author: 'Luna Readers', cover: '#8B4513', tracks: 8 },
    { title: 'Misterio y Dark Academia', author: 'Fukurō Music', cover: '#2E1911', tracks: 15 },
    { title: 'Aventuras en Taberna', author: 'Bard Guild', cover: '#A0522D', tracks: 10 }
  ];

  constructor(private toastService: ToastService) {}

  closeDemoModal() {
    this.showDemoModal = false;
  }

  showDemoToast(action: string) {
    let msg = `Al presionar este botón, podrás interactuar con esa característica en la versión oficial.`;
    if (action.includes('Comenzar a leer') || action.includes('Leer ')) {
      msg = 'Se abrirá el lector inmersivo a pantalla completa para que disfrutes de la historia sin distracciones.';
    } else if (action.includes('Inscribirse')) {
       msg = 'Serás redirigido a la pasarela virtual donde podrás comprar tus entradas o ver la agenda del evento.';
    } else if (action.includes('Reproducir Playlist')) {
       msg = 'El reproductor de The Fukurō Music comenzará a sonar en la plataforma en segundo plano.';
    } else if (action.includes('Guardar')) {
       msg = 'La obra seleccionada se añadirá instantáneamente a tus estantes de "Por Leer" o "Guardados".';
    }
    
    this.toastService.show('Simulación Oficial', msg);
  }
}
