import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/service/data.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
  })

  utilsSvc = inject(UtilsService)

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.apiService.register(this.form.value as User).pipe( finalize(() => { loading.dismiss(); })).subscribe(
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
