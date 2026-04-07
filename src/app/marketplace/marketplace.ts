import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';




interface Professional {
  id: number;
  name: string;
  role: string;
  specialty: string[];
  rating: number;
  completedProjects: number;
  price: string;
  avatarColor: string;
  isAvailable: boolean;
  badges: string[];
}

interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

@Component({
  selector: 'app-marketplace',
  imports: [CommonModule],
  templateUrl: './marketplace.html',
  styleUrl: './marketplace.css',
})
export class Marketplace {


  categories: ServiceCategory[] = [
    { id: 'editing', name: 'Corrección y Edición', icon: '✍️', count: 245 },
    { id: 'translation', name: 'Traducción', icon: '🌐', count: 187 },
    { id: 'voice', name: 'Actores de Voz', icon: '🎙️', count: 132 },
    { id: 'art', name: 'Arte y Diseño', icon: '🎨', count: 312 },
    { id: 'beta', name: 'Beta Readers', icon: '👁️', count: 89 },
    { id: 'coaching', name: 'Coaching', icon: '🎯', count: 76 },
  ];

  professionals: Professional[] = [
    { 
      id: 1, 
      name: 'María Rodríguez', 
      role: 'Editora Profesional', 
      specialty: ['Fantasy', 'Romance', 'Line Editing'], 
      rating: 4.9, 
      completedProjects: 142, 
      price: '$0.02/palabra', 
      avatarColor: '#4ECDC4',
      isAvailable: true,
      badges: ['Top Rated', 'Fast Delivery']
    },
    { 
      id: 2, 
      name: 'Carlos Kim', 
      role: 'Traductor EN→ES', 
      specialty: ['Webnovels', 'Light Novels', 'Localización'], 
      rating: 4.8, 
      completedProjects: 89, 
      price: '$0.03/palabra', 
      avatarColor: '#FF6B6B',
      isAvailable: true,
      badges: ['Native Speaker']
    },
    { 
      id: 3, 
      name: 'Sofia Chen', 
      role: 'Artista de Portadas', 
      specialty: ['Manga', 'Fantasy', 'Romance'], 
      rating: 5.0, 
      completedProjects: 201, 
      price: '$150-400', 
      avatarColor: '#FFD166',
      isAvailable: false,
      badges: ['Featured Artist', 'Quick Turnaround']
    },
    { 
      id: 4, 
      name: 'David López', 
      role: 'Actor de Voz', 
      specialty: ['Audiolibros', 'Personajes Masculinos', 'Narración'], 
      rating: 4.7, 
      completedProjects: 67, 
      price: '$50-200/capítulo', 
      avatarColor: '#118AB2',
      isAvailable: true,
      badges: ['Professional Studio']
    },
    { 
      id: 5, 
      name: 'Ana Martínez', 
      role: 'Beta Reader', 
      specialty: ['YA', 'Dark Romance', 'Character Development'], 
      rating: 4.8, 
      completedProjects: 56, 
      price: '$30/capítulo', 
      avatarColor: '#EF476F',
      isAvailable: true,
      badges: ['Detailed Feedback']
    },
    { 
      id: 6, 
      name: 'Luis García', 
      role: 'Diseñador Webtoon', 
      specialty: ['Manhwa', 'Webcomics', 'Lettering'], 
      rating: 4.9, 
      completedProjects: 112, 
      price: '$40/página', 
      avatarColor: '#06D6A0',
      isAvailable: true,
      badges: ['Webtoon Certified']
    },
  ];

  selectedCategory = 'all';

  filterByCategory(categoryId: string) {
    this.selectedCategory = categoryId;
  }
}
