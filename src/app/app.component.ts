import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CompleteLayoutComponent } from './layout/complete-layout/complete-layout.component';
import { LoginService } from './services/login.service';
import { iLoginInformation } from './interfaces/iLoginInformation';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CompleteLayoutComponent, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'prueba_tecnica_mercadona';

  constructor(private loginSE: LoginService) {}

  ngOnInit() {
    // We check if the user is logged in
    const loginInformation: iLoginInformation = this.checkLoginInformation();

    // We handle the login status
    this.loginSE.handleLogin(loginInformation);
  }

  private checkLoginInformation() {
    // We check if the user has a token and username in the local storage
    const token: string | null = localStorage.getItem('mercadona_token');
    const username: string | null = localStorage.getItem('mercadona_username');
    const hasToken: boolean = token && token === 'tenemos_token' ? true : false;
    const hasTokenAndUsername = hasToken && username ? true : false;

    // We create an object with the login information
    const loginInformation: iLoginInformation = {
      hasToken,
      username: username || '',
      hasTokenAndUsername,
    };

    // We return the login information
    return loginInformation;
  }
}
