import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UtilsService } from './services/utils.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  utilsSvc = inject(UtilsService);

  public appPages = [
    { title: 'Usuários', url: '/home', icon: 'home', hide: false },
    { title: 'Permissões', url: '/permissions', icon: 'archive', hide: !this.utilsSvc.hasAnyPermission(['visualizar_permissoes'])},
    { title: 'Sair', url: '/auth', icon: 'exit', hide: false },
  ];
  public hideMenuUrls = ['/auth', '/auth/sign-up'];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

   isHideMenu: boolean = false;

  constructor(private router: Router, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Verifica se a URL da navegação está nas URLs para ocultar o menu
      if (this.hideMenuUrls.includes(event.urlAfterRedirects)) {
        this.isHideMenu = true;
      } else {
        this.isHideMenu = false;
      }

      this.appPages = [
        { title: 'Usuários', url: '/home', icon: 'home', hide: false },
        { title: 'Permissões', url: '/permissions', icon: 'archive', hide: !this.utilsSvc.hasAnyPermission(['visualizar_permissoes'])},
        { title: 'Sair', url: '/auth', icon: 'exit', hide: false },
      ];
      // Força a detecção de mudanças
      // Para corrigir o bug, mudava para a tela home e o menu não aparecia
      this.cdRef.detectChanges();
    });
  }
}
