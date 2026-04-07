import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoleService, UserRole } from '../core/services/role.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  isMenuOpen = false;
  currentRole: UserRole = 'lector';

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.roleService.currentRole$.subscribe(role => {
      this.currentRole = role;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  setRole(role: UserRole) {
    this.roleService.setRole(role);
  }
}
