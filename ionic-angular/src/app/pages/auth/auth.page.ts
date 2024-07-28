import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor() { }

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {
      // const loading = await this.utilsSvc.loading();
      // await loading.present();

      // this.utilsSvc.presentToast({
      //   message: 'teste',
      //   duration: 2500,
      //   color: 'primary',
      //   position: 'middle',
      //   icon: 'alert-circle-outline'
      // });

    }
  }

}
