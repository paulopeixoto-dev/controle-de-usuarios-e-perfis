import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public hideMenuUrls = ['/auth', '/auth/sign-up'];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

   isHideMenu: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // ================ OCULTAR MENU ====================
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (this.hideMenuUrls.includes(event.urlAfterRedirects)) this.isHideMenu = true;
    });

  }

}
