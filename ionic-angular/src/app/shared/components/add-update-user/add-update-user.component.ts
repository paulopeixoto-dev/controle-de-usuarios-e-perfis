import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/service/data.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.scss'],
})
export class AddUpdateUserComponent  implements OnInit {

  @Input() user: User;

  form = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
  })

  utilsSvc = inject(UtilsService)

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    if(this.user) this.form.patchValue(this.user);

    // ===========  Torna Campo obrigatório se criar um novo usuário ====================
    if (!this.user) {
      const passwordControl = this.form.get('password');
      passwordControl.setValidators([Validators.required]);
    }
  }

  submit() {
    if (this.form.valid) {
      if(this.user) this.updateUser();
      else this.createUser();
    }
  }

  // =============  Criar usuário ============
  async createUser() {
    const loading = await this.utilsSvc.loading();
    await loading.present();

    this.apiService.register(this.form.value as User).pipe( finalize(() => { loading.dismiss(); })).subscribe(
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
  async updateUser() {
    const loading = await this.utilsSvc.loading();
    await loading.present();

    this.apiService.updateUser(this.form.value as User, this.user.id).pipe( finalize(() => { loading.dismiss(); })).subscribe(
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
