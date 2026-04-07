import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-webnovels',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './webnovels.html',
  styleUrl: './webnovels.css'
})
export class Webnovels {
  dummyBooks = [1, 2, 3, 4, 5, 6, 7, 8];
}
