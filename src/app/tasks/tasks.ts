import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';



interface DailyTask {
  id: number;
  title: string;
  description: string;
  reward: number;
  icon: string;
  completed: boolean;
  type: 'daily' | 'weekly' | 'achievement';
  progress?: number;
  maxProgress?: number;
}

interface AdOffer {
  id: number;
  title: string;
  description: string;
  duration: string;
  reward: number;
  category: string;
}


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {

  userFeathers = 1250;
  dailyStreak = 7;
  
  dailyTasks: DailyTask[] = [
    { id: 1, title: 'Leer 3 capítulos', description: 'Lee cualquier historia en Fukurō', reward: 10, icon: '📖', completed: true, type: 'daily' },
    { id: 2, title: 'Dejar un comentario', description: 'Comenta en un capítulo que te guste', reward: 5, icon: '💬', completed: false, type: 'daily' },
    { id: 3, title: 'Enviar un corazón', description: 'Apoya a un autor con un regalo', reward: 15, icon: '❤️', completed: false, type: 'daily' },
    { id: 4, title: 'Compartir en redes', description: 'Comparte tu historia favorita', reward: 20, icon: '📱', completed: false, type: 'daily' },
    { id: 5, title: 'Invitar un amigo', description: 'Comparte tu enlace de referido', reward: 50, icon: '👥', completed: false, type: 'daily' },
  ];
  
  weeklyTasks: DailyTask[] = [
    { id: 6, title: 'Leer 20 capítulos', description: 'Completa 20 capítulos esta semana', reward: 100, icon: '📚', completed: false, type: 'weekly', progress: 12, maxProgress: 20 },
    { id: 7, title: 'Descubrir 5 nuevas historias', description: 'Lee primeras páginas de 5 obras', reward: 75, icon: '✨', completed: true, type: 'weekly', progress: 5, maxProgress: 5 },
    { id: 8, title: 'Ser activo por 7 días', description: 'Visita Fukurō todos los días', reward: 150, icon: '🔥', completed: false, type: 'weekly', progress: 4, maxProgress: 7 },
  ];
  
  achievements: DailyTask[] = [
    { id: 9, title: 'Lector Voraz', description: 'Leer 100 capítulos en total', reward: 500, icon: '🏆', completed: false, type: 'achievement', progress: 67, maxProgress: 100 },
    { id: 10, title: 'Apoyo a Creadores', description: 'Enviar 50 regalos a autores', reward: 1000, icon: '👑', completed: false, type: 'achievement', progress: 23, maxProgress: 50 },
    { id: 11, title: 'Comentarista Experto', description: 'Dejar 100 comentarios', reward: 300, icon: '💎', completed: false, type: 'achievement', progress: 42, maxProgress: 100 },
  ];
  
  adOffers: AdOffer[] = [
    { id: 1, title: 'Video de 30 segundos', description: 'Descubre nuevas herramientas para escritores', duration: '30s', reward: 10, category: 'Herramientas' },
    { id: 2, title: 'Encuesta rápida', description: 'Ayúdanos a mejorar Fukurō', duration: '2min', reward: 25, category: 'Feedback' },
    { id: 3, title: 'Descubre una nueva app', description: 'Conoce apps creativas recomendadas', duration: '45s', reward: 15, category: 'Descubrimiento' },
    { id: 4, title: 'Prueba un juego literario', description: 'Juegos basados en tus historias favoritas', duration: '1min', reward: 20, category: 'Entretenimiento' },
  ];
  
  completeTask(task: DailyTask) {
    if (!task.completed) {
      task.completed = true;
      this.userFeathers += task.reward;
    }
  }
  
  watchAd(ad: AdOffer) {
    // Placeholder para funcionalidad futura
    alert(`Viendo anuncio: ${ad.title} (+${ad.reward} feathers)`);
    this.userFeathers += ad.reward;
  }
}