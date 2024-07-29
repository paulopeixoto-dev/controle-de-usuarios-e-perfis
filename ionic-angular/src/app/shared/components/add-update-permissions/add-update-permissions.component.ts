import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Permission } from 'src/app/models/permission.model';
import { ApiService } from 'src/app/service/data.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-permissions',
  templateUrl: './add-update-permissions.component.html',
  styleUrls: ['./add-update-permissions.component.scss'],
})
export class AddUpdatePermissionsComponent  implements OnInit {

@Input() permission: Permission;


  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    criar_usuario: new FormControl(false),
    deletar_usuario: new FormControl(false),
    editar_outro_usuario: new FormControl(false),
    editar_proprio_usuario: new FormControl(false),
    visualizar_todos_usuario: new FormControl(false),
    criar_perfil: new FormControl(false),
    editar_perfil: new FormControl(false),
    visualizar_permissoes : new FormControl(false),
  })

  utilsSvc = inject(UtilsService)

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    if(this.permission) this.form.patchValue(this.permission);

    // ===========  Torna Campo obrigatório se criar um novo usuário ====================
    if (!this.permission) {
      const passwordControl = this.form.get('password');
      passwordControl.setValidators([Validators.required]);
    }
  }

  submit() {
    if (this.form.valid) {
      if(this.permission) this.updatePermission();
      else this.createPermission();
    }
  }

  // =============  Criar usuário ============
  async createPermission() {
    const loading = await this.utilsSvc.loading();
    await loading.present();

    this.apiService.createPermission(this.form.value as Permission).pipe( finalize(() => { loading.dismiss(); })).subscribe(
      (response) => {
        this.utilsSvc.presentToast({ message: response.message, duration: 2500, color: 'primary', position: 'middle', icon: 'alert-circle-outline' });
        this.utilsSvc.dismissModal({ success: true });
        this.form.reset();
      },
      (error) => {
        this.utilsSvc.presentToast({ message: error.error.message, duration: 2500, color: 'danger', position: 'middle', icon: 'alert-circle-outline' });
      }
    );
  }

  // =============  Alterar usuário ============
  async updatePermission() {
    const loading = await this.utilsSvc.loading();
    await loading.present();

    console.log('permissions', this.form.value)

    this.apiService.updatePermission(this.form.value as Permission, this.permission.id).pipe( finalize(() => { loading.dismiss(); })).subscribe(
      (response) => {
        this.utilsSvc.presentToast({ message: response.message, duration: 2500, color: 'primary', position: 'middle', icon: 'alert-circle-outline' });
        this.utilsSvc.dismissModal({ success: true });
        this.form.reset();
      },
      (error) => {
        this.utilsSvc.presentToast({ message: error.error.message, duration: 2500, color: 'danger', position: 'middle', icon: 'alert-circle-outline' });
      }
    );
  }
}
