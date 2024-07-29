import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  modalCtrl = inject(ModalController);
  router = inject(Router);

  // ============ Loading ==============
  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' })
  }

  // ============ Toast ================
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  // ============ Router ================
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  // ============ Save Local Storage ================
  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  // ============ Get Local Storage ================
  getInLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  // ============ Modal ================
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts);
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if(data) return data;
  }

  dismissModal(data?: any) {
    return this.modalCtrl.dismiss(data);
  }

  hasAnyPermission(requiredPermissions: string[]): boolean {

    const user = JSON.parse(this.getInLocalStorage('user'));

    return user.usuario.permissoes.some(permissao => requiredPermissions.includes(permissao.slug));

  }

}
