import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type UserRole = 'lector' | 'autor' | 'freelancer';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roleSubject = new BehaviorSubject<UserRole>('lector');
  currentRole$ = this.roleSubject.asObservable();

  setRole(role: UserRole) {
    this.roleSubject.next(role);
  }
  
  getRole(): UserRole {
    return this.roleSubject.value;
  }
}
