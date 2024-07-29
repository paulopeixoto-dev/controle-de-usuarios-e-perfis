import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/service/data.service';
import { finalize } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateUserComponent } from 'src/app/shared/components/add-update-user/add-update-user.component';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  utilsSvc = inject(UtilsService);


  constructor(private apiService: ApiService) {
    this.getUsers();
  }

  users: User[] = [];

  ngOnInit() {
  }

  async addUpdateUser(user?: User) {
    console.log(user)
    let success = await this.utilsSvc.presentModal({
      component: AddUpdateUserComponent,
      cssClass: 'add-update-modal',
      componentProps: { user }
    })

    if(success) this.getUsers();
  }

  async deleteUser(user?: User) {
    const loading = await this.utilsSvc.loading();
    await loading.present();

    this.apiService.deleteUser(user.id).pipe( finalize(() => { loading.dismiss(); })).subscribe(
      (response) => {
        this.utilsSvc.presentToast({ message: response.message, duration: 2500, color: 'primary', position: 'middle', icon: 'alert-circle-outline' });
        this.getUsers();
      },
      (error) => {
        // Mostrar mensagem de erro
        this.utilsSvc.presentToast({ message: error.error.message, duration: 2500, color: 'danger', position: 'middle', icon: 'alert-circle-outline' });
      }
    );
  }



  async getUsers() {
    const loading = await this.utilsSvc.loading();
    await loading.present();

    this.apiService.getAllUser().pipe( finalize(() => { loading.dismiss(); })).subscribe(
      (response) => {
        this.users = response.data;
      },
      (error) => {
        // Mostrar mensagem de erro
        this.utilsSvc.presentToast({ message: error.error.message, duration: 2500, color: 'danger', position: 'middle', icon: 'alert-circle-outline' });
      }
    );
  }

}
