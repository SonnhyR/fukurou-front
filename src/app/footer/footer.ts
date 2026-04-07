import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

  currentYear = new Date().getFullYear();
  
  quickLinks = [
    { label: 'Sobre Fukurō', link: '#' },
    { label: 'Blog', link: '#' },
    { label: 'Precios', link: '#' },
    { label: 'Carreras', link: '#' },
    { label: 'Contacto', link: '#' }
  ];
  
  resources = [
    { label: 'Centro de Ayuda', link: '#' },
    { label: 'Comunidad', link: '#' },
    { label: 'Guías para Autores', link: '#' },
    { label: 'Términos de Servicio', link: '#' },
    { label: 'Política de Privacidad', link: '#' }
  ];
  
  socialLinks = [
    { platform: 'Twitter', icon: '🐦', link: '#' },
    { platform: 'Instagram', icon: '📷', link: '#' },
    { platform: 'Discord', icon: '💬', link: '#' },
    { platform: 'YouTube', icon: '🎥', link: '#' },
    { platform: 'TikTok', icon: '🎵', link: '#' }
  ];
}
