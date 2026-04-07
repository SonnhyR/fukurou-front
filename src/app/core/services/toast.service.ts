import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  id: number;
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  toasts$ = this.toastsSubject.asObservable();
  private idCounter = 0;

  show(title: string, message: string) {
    const newToast: ToastMessage = { id: this.idCounter++, title, message };
    const current = this.toastsSubject.value;
    this.toastsSubject.next([...current, newToast]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      this.remove(newToast.id);
    }, 5000);
  }

  remove(id: number) {
    const filtered = this.toastsSubject.value.filter(t => t.id !== id);
    this.toastsSubject.next(filtered);
  }
}
