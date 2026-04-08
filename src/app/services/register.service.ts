// src/app/services/register.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterRequest {
    email: string;
    username: string;
    password: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    // 🔴 CAMBIA ESTA URL por la que te dio Railway
    private apiUrl = 'https://fukurou-back-production.up.railway.app/api';

    constructor(private http: HttpClient) { }

    register(userData: RegisterRequest): Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, userData);
    }
}