import { Component } from '@angular/core';
import { ToastService } from '../core/services/toast.service';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [],
  templateUrl: './wallet.html',
  styleUrl: './wallet.css',
})
export class Wallet {
  constructor(private toastService: ToastService) {}

  showDemoToast(action: string) {
    if (action === 'Recargar Feathers') {
      this.toastService.show('Simulación Oficial', `Al hacer clic aquí en la versión oficial, se abrirá la pasarela de pagos para recargar tu saldo.`);
    } else {
      this.toastService.show('Simulación Oficial', `Al hacer clic aquí en la versión oficial, podrás canjear tus Feathers acumulados por dinero real a tu cuenta bancaria.`);
    }
  }
}

