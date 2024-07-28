import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/service/data.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  utilsSvc = inject(UtilsService)

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.apiService.login(this.form.value as User).pipe( finalize(() => { loading.dismiss(); })).subscribe(
        (response) => {
          this.utilsSvc.presentToast({ message: response.message, duration: 2500, color: 'primary', position: 'middle', icon: 'alert-circle-outline' });
          this.utilsSvc.saveInLocalStorage('user', {"usuario" : response.usuario, "token": response.token});
          this.utilsSvc.routerLink('/home');
          this.form.reset();
        },
        (error) => {
          this.utilsSvc.presentToast({ message: error.error.message, duration: 2500, color: 'danger', position: 'middle', icon: 'alert-circle-outline' });
        }
      );
    }
  }
}
