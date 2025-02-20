import { Component, model, Signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { iButtonOptions } from '../../interfaces/iButtonOptions';
import { LoginService } from '../../services/login.service';
import { iLoginInformation } from '../../interfaces/iLoginInformation';
import { LoginModalService } from '../../services/loginModal.service';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete-layout',
  imports: [NgOptimizedImage, ButtonComponent],
  templateUrl: './complete-layout.component.html',
  styleUrl: './complete-layout.component.scss',
  providers: [LoginModalService],
})
export class CompleteLayoutComponent {
  isLogged: boolean = false;

  buttonOptionsLogin: iButtonOptions = {
    text: 'Iniciar sesión',
    onClick: () => this.openLoginDialog(),
    class: 'secondary',
    disabled: false,
  };

  buttonOptionsLogout: iButtonOptions = {
    text: '',
    onClick: () => this.loginSE.logout(),
    class: 'no-background',
    disabled: false,
    icon: 'logout',
    reverseIcon: true,
  };

  // suscription
  private loginInformationSubscription: Subscription | null = null;

  constructor(
    private loginSE: LoginService,
    private loginModalSE: LoginModalService,
    private router: Router
  ) {}

  ngOnInit() {
    // We establish the connexion with the behavior subject of the service that handles the information of the user's session
    this.connectToLoginServiceBS();
  }

  private connectToLoginServiceBS() {
    // We subscribe to the behavior subject to know if the user is logged in
    this.loginInformationSubscription = this.loginSE.loginInformation.subscribe(
      (isLogged: iLoginInformation) => {
        // We update the value of the variable that indicates if the user is logged in
        this.isLogged = isLogged.hasTokenAndUsername;

        // If the user is logged in, we get the username
        this.buttonOptionsLogout.text = isLogged.username;
      }
    );
  }

  openLoginDialog() {
    const subject: Subject<any> = new Subject();
    this.loginModalSE.openDialog(subject);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if (this.loginInformationSubscription)
      this.loginInformationSubscription.unsubscribe();
  }
}
