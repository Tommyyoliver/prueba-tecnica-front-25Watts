import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private router = inject(Router);

  showSidebarProfile: boolean = false;

  handlerShowSidebarProfile(value:boolean) {
    this.showSidebarProfile = value;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.goTo('login');
  }

  goTo(path:string) {
    this.router.navigate([path]);
  }
}
