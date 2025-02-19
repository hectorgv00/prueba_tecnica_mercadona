import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CompleteLayoutComponent } from './layout/complete-layout/complete-layout.component';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CompleteLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [LoginService],
})
export class AppComponent {
  title = 'prueba_tecnica_mercadona';

  constructor(private loginSE: LoginService) {}

  ngOnInit() {
    const isLogged = this.checkLogin();
    this.handleLogged(isLogged);
  }

  private checkLogin() {
    const token = localStorage.getItem('mercadona_token');
    return token && token == 'tenemos_token' ? true : false;
  }

  private handleLogged(isLogged: boolean) {
    if (isLogged) {
      this.loginSE.login();
    } else {
      this.loginSE.logout();
    }
  }
}
