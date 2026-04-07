import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { Marketplace } from './marketplace/marketplace';
import { Profile } from './profile/profile';
import { Tasks } from './tasks/tasks';
import { Webnovels } from './webnovels/webnovels';
import { Home } from './home/home';
import { CharacterFicha } from './character-ficha/character-ficha.component';
import { Publishing } from './publishing/publishing';
import { Soundtrack } from './soundtrack/soundtrack';
import { Audiobooks } from './audiobooks/audiobooks';
import { Fanfics } from './fanfics/fanfics';
import { GameBooks } from './game-books/game-books';
import { Donations } from './donations/donations';
import { ReadingStats } from './reading-stats/reading-stats';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';

// Define las rutas
export const routes: Routes = [
  { path: '', component: Home },  // Ruta principal
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'character-ficha', component: CharacterFicha },
  { path: 'webnovels', component: Webnovels },
  { path: 'marketplace', component: Marketplace },
  { path: 'tasks', component: Tasks },
  { path: 'profile', component: Profile },
  { path: 'publishing', component: Publishing },
  { path: 'soundtrack', component: Soundtrack },
  { path: 'audiobooks', component: Audiobooks },
  { path: 'fanfics', component: Fanfics },
  { path: 'game-books', component: GameBooks },
  { path: 'donations', component: Donations },
  { path: 'reading-stats', component: ReadingStats },
  { path: '**', redirectTo: '' }  // Ruta por defecto si no existe
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)  // Proporciona las rutas configuradas
  ]
};