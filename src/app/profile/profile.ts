import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Wallet } from '../wallet/wallet';
import { RoleService, UserRole } from '../core/services/role.service';
import { ToastService } from '../core/services/toast.service';

interface UserStat {
  label: string;
  value: number | string;
  icon: string;
  color: string;
}

interface UserWork {
  id: number;
  title: string;
  type: 'book' | 'webnovel' | 'fanfic' | 'playlist' | 'audiobook' | 'game-book';
  status: 'published' | 'draft' | 'writing';
  chapters: number;
  readers: number;
  lastUpdated: string;
}

interface ActiveTab {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, Wallet],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  currentRole: UserRole = 'lector';
  activeTab: string = '';
  tabs: ActiveTab[] = [];
  
  userStats: UserStat[] = [];
  userWorks: UserWork[] = [];
  
  userProfile = {
    name: 'Alex Chen',
    username: '@alex_writer',
    bio: 'Apasionado por la fantasía oscura. Actualmente explorando la interacción en este entorno DEMO.',
    joinDate: 'Hoy',
    avatarColor: '#5D4037',
    level: 1,
    badges: ['Pionero']
  };

  constructor(
    private roleService: RoleService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.roleService.currentRole$.subscribe(r => {
      this.currentRole = r;
      this.setupRoleMocks();
    });
  }

  setupRoleMocks() {
    if (this.currentRole === 'lector') {
      this.userProfile.name = 'Alex (Lector)';
      this.userProfile.badges = ['Lector Constante', 'Beta Tester'];
      this.userStats = [
        { label: 'Libros Leídos', value: 12, icon: '📚', color: '#4CAF50' },
        { label: 'En progreso', value: 3, icon: '👁️', color: '#FF9800' },
        { label: 'Feathers', value: '1.2K', icon: '🪶', color: '#FFD166' }
      ];
      this.tabs = [
        { id: 'library', name: 'Mi Biblioteca', icon: '📚' },
        { id: 'tbr', name: 'TBR (Por Leer)', icon: '📖' },
        { id: 'lists', name: 'Listas/Playlists', icon: '🎵' },
        { id: 'services_bought', name: 'Servicios Adquiridos', icon: '🛍️' },
        { id: 'config', name: 'Configuración', icon: '⚙️' }
      ];
      this.activeTab = 'library';
      
    } else if (this.currentRole === 'autor') {
      this.userProfile.name = 'Alex (Autor)';
      this.userProfile.badges = ['Autor Verificado', 'Best Seller Indie'];
      this.userStats = [
        { label: 'Obras Publicadas', value: 4, icon: '✍️', color: '#FF9800' },
        { label: 'Lectores', value: '15K', icon: '👥', color: '#4CAF50' },
        { label: 'Ingresos', value: '$340', icon: '💰', color: '#EF476F' }
      ];
      this.tabs = [
        { id: 'works', name: 'Mis Obras', icon: '✍️' },
        { id: 'earnings', name: 'Mis Ganancias', icon: '💰' },
        { id: 'playlists', name: 'Playlists Creadas', icon: '🎵' },
        { id: 'characters', name: 'Personajes', icon: '👥' },
        { id: 'fanfics', name: 'Fanfics', icon: '🔄' },
        { id: 'config', name: 'Configuración', icon: '⚙️' }
      ];
      this.activeTab = 'works';
      
      this.userWorks = [
        { id: 1, title: 'Sombras del Amanecer', type: 'book', status: 'published', chapters: 24, readers: 8500, lastUpdated: '2 días' },
        { id: 2, title: 'Corazones de Cristal', type: 'webnovel', status: 'writing', chapters: 8, readers: 342, lastUpdated: 'hoy' }
      ];
      
    } else if (this.currentRole === 'freelancer') {
      this.userProfile.name = 'Alex (Freelancer)';
      this.userProfile.badges = ['Ilustrador Pro', 'Editor'];
      this.userStats = [
        { label: 'Contratos Activos', value: 2, icon: '📄', color: '#2196F3' },
        { label: 'Servicios', value: 5, icon: '🛠️', color: '#9C27B0' },
        { label: 'Calificación', value: '5.0', icon: '⭐', color: '#FFD166' }
      ];
      this.tabs = [
        { id: 'freelance_services', name: 'Mis Servicios', icon: '🛠️' },
        { id: 'earnings', name: 'Ganancias', icon: '💰' },
        { id: 'contracts', name: 'Mis Contratos', icon: '📄' },
        { id: 'config', name: 'Configuración', icon: '⚙️' }
      ];
      this.activeTab = 'freelance_services';
    }
  }

  selectTab(tabId: string) {
    this.activeTab = tabId;
  }

  showDemoToast(action: string) {
    let msg = `Acción "${action}" disponible en la versión oficial.`;
    if (action === 'Cambiar Contraseña' || action === 'Preferencias de Lectura') {
      msg = 'Se abrirá un menú lateral para configurar tus preferencias de seguridad o de lectura interactiva.';
    } else if (action === 'Libro en biblioteca') {
      msg = 'Al presionar reiniciarás tu lectura exactamente donde la dejaste.';
    } else if (action === 'Editar Obra') {
      msg = 'Ingresarás al procesador de texto para redactar o modificar capítulos de tu obra.';
    } else if (action === 'Ver Estadísticas') {
      msg = 'Cargará un panel de análisis gráfico sobre el comportamiento de tus lectores semanales.';
    } else if (action === 'Crear Nueva Obra') {
      msg = 'Se desplegará el asistente para registrar un nuevo libro, subiendo portada y sinopsis.';
    } else if (action === 'Visualizar Historial PDF') {
      msg = 'Se descargará un recibo PDF automático resumiendo todas las transacciones.';
    } else if (action === 'Modificar Oferta' || action === 'Publicar Servicio Freelance') {
      msg = 'Ajustarás el precio, portafolio y tiempos de entrega mostrados al público.';
    } else if (action === 'Entregar Archivos') {
      msg = 'Se enviarán los archivos al contratante e iniciará la liberación del pago pendiente.';
    }
    
    this.toastService.show('Simulación Oficial', msg);
  }

  logout() {
    this.toastService.show('Cerrar Sesión', `Has cerrado sesión en la demo.`);
  }
}