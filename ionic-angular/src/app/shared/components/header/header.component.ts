import { Component, Input, OnInit, inject } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title!: string;
  @Input() backButton!: string;
  @Input() hideExit: boolean = false;
  @Input() isModal!: boolean;

  utilsSvc = inject(UtilsService);

  ngOnInit() {}

  dismissModal() {
    this.utilsSvc.dismissModal();
  }

  exit() {
    this.utilsSvc.saveInLocalStorage('user', {});
    this.utilsSvc.routerLink('/auth');
  }

}
