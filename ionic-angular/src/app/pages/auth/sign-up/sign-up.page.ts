import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
