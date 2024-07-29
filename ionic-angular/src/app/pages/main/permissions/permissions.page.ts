import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/service/data.service';
import { finalize } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { Permission } from 'src/app/models/permission.model';
import { AddUpdatePermissionsComponent } from 'src/app/shared/components/add-update-permissions/add-update-permissions.component';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.page.html',
  styleUrls: ['./permissions.page.scss'],
})
export class PermissionsPage implements OnInit {

  utilsSvc = inject(UtilsService);


  constructor(private apiService: ApiService) {
    this.getAllPermissions();
  }

  permissions: Permission[] = [];

  ngOnInit() {
  }

  async addUpdatePermission(permission?: Permission) {
    let success = await this.utilsSvc.presentModal({
      component: AddUpdatePermissionsComponent,
      cssClass: 'add-update-modal',
      componentProps: { permission }
    })

    if(success) this.getAllPermissions();

  }

  async deletePermission(permission?: Permission) {
    const loading = await this.utilsSvc.loading();
    await loading.present();

    this.apiService.deleteUser(permission.id).pipe( finalize(() => { loading.dismiss(); })).subscribe(
      (response) => {
        this.utilsSvc.presentToast({ message: response.message, duration: 2500, color: 'primary', position: 'middle', icon: 'alert-circle-outline' });
        this.getAllPermissions();
      },
      (error) => {
        // Mostrar mensagem de erro
        this.utilsSvc.presentToast({ message: error.error.message, duration: 2500, color: 'danger', position: 'middle', icon: 'alert-circle-outline' });
      }
    );
  }



  async getAllPermissions() {
    const loading = await this.utilsSvc.loading();
    await loading.present();

    this.apiService.getAllPermissions().pipe( finalize(() => { loading.dismiss(); })).subscribe(
      (response) => {
        this.permissions = response.data;
      },
      (error) => {
        // Mostrar mensagem de erro
        this.utilsSvc.presentToast({ message: error.error.message, duration: 2500, color: 'danger', position: 'middle', icon: 'alert-circle-outline' });
      }
    );
  }

}
