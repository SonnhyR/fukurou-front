// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // ← Importante para el formulario
import { HttpClientModule } from '@angular/common/http';  // ← Para peticiones HTTP
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  // Datos del formulario
  formData = {
    username: '',
    email: '',
    password: ''
  };

  // Estados de la UI
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private registerService: RegisterService) { }

  onSubmit() {
    // Limpiar mensajes anteriores
    this.errorMessage = '';
    this.successMessage = '';

    // Validaciones básicas
    if (!this.formData.username || this.formData.username.length < 3) {
      this.errorMessage = 'El nombre de usuario debe tener al menos 3 caracteres';
      return;
    }

    if (!this.formData.email || !this.formData.email.includes('@')) {
      this.errorMessage = 'Ingresa un correo electrónico válido';
      return;
    }

    if (!this.formData.password || this.formData.password.length < 4) {
      this.errorMessage = 'La contraseña debe tener al menos 4 caracteres';
      return;
    }

    this.isLoading = true;

    this.registerService.register(this.formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.successMessage = response.message;
          // Limpiar formulario
          this.formData = { username: '', email: '', password: '' };
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.isLoading = false;
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Error de conexión. Intenta nuevamente.';
        }
        console.error('Error al registrar:', error);
      }
    });
  }
}