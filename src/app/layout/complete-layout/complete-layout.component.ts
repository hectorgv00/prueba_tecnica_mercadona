import { Component, model, Signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { iButtonOptions } from '../../interfaces/iButtonOptions';
import { LoginService } from '../../services/login.service';
import { iLoginInformation } from '../../interfaces/iLoginInformation';

@Component({
  selector: 'app-complete-layout',
  imports: [NgOptimizedImage, ButtonComponent],
  templateUrl: './complete-layout.component.html',
  styleUrl: './complete-layout.component.scss',
  providers: [LoginService],
})
export class CompleteLayoutComponent {
  public isLogged: boolean = false;

  public buttonOptionsLogin: iButtonOptions = {
    text: 'Iniciar sesión',
    onClick: () => this.handleLogin(),
    class: 'secondary',
    disabled: false,
  };

  public buttonOptionsLogout: iButtonOptions = {
    text: '',
    onClick: () => this.loginSE.logout(),
    class: 'no-background',
    disabled: false,
    icon: 'logout',
  };

  constructor(private loginSE: LoginService) {}

  ngOnInit() {
    // We establish the connexion with the behavior subject of the service that handles the information of the user's session
    this.connectToLoginServiceBS();
  }

  private connectToLoginServiceBS() {
    // We subscribe to the behavior subject to know if the user is logged in
    this.loginSE.loginInformation.subscribe((isLogged: iLoginInformation) => {
      // We update the value of the variable that indicates if the user is logged in
      this.isLogged = isLogged.hasTokenAndUsername;

      // If the user is logged in, we get the username
      this.buttonOptionsLogout.text = isLogged.username;
    });
  }

  public handleLogin() {
    const fakeData: iLoginInformation = {
      hasToken: true,
      username: 'mercadona',
      hasTokenAndUsername: true,
    };

    // We simulate the login process
    this.loginSE.handleLogin(fakeData);
  }
}
