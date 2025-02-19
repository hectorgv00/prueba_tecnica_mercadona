import { Component, model, Signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { iButtonOptions } from '../../interfaces/iButtonOptions';
import { LoginService } from '../../services/login.service';
import { iLoginInformation } from '../../interfaces/iLoginInformation';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../../modal/login-modal/login-modal.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-complete-layout',
  imports: [NgOptimizedImage, ButtonComponent],
  templateUrl: './complete-layout.component.html',
  styleUrl: './complete-layout.component.scss',
})
export class CompleteLayoutComponent {
  isLogged: boolean = false;

  buttonOptionsLogin: iButtonOptions = {
    text: 'Iniciar sesión',
    onClick: () => this.openDialog(),
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

  constructor(private loginSE: LoginService, private dialog: MatDialog) {}

  ngOnInit() {
    // We establish the connexion with the behavior subject of the service that handles the information of the user's session
    this.connectToLoginServiceBS();
  }

  private connectToLoginServiceBS() {
    // We subscribe to the behavior subject to know if the user is logged in
    this.loginSE.loginInformation.subscribe((isLogged: iLoginInformation) => {
      console.log(isLogged);
      // We update the value of the variable that indicates if the user is logged in
      this.isLogged = isLogged.hasTokenAndUsername;

      // If the user is logged in, we get the username
      this.buttonOptionsLogout.text = isLogged.username;
    });
  }

  handleLogin() {
    const fakeData: iLoginInformation = {
      hasToken: true,
      username: 'mercadona',
      hasTokenAndUsername: true,
    };

    // We simulate the login process
    this.loginSE.handleLogin(fakeData);
  }

  // Function that opens the login modal
  openDialog() {
    // We create a subject to unsubscribe from the observable when the modal is closed
    const subject = new Subject();

    // we store the reference of the dialog to get the information once is closed
    const dialog = this.dialog.open(LoginModalComponent);

    // We subscribe to the observable of the dialog to get the information once is closed
    dialog
      .afterClosed()
      .pipe(takeUntil(subject))
      .subscribe((result: { username: string }) => {
        // If the user has provided a username, we simulate the login process
        if (result) {
          // We create the object with the information of the user's session
          const loginInformation: iLoginInformation = {
            hasToken: true,
            username: result.username,
            hasTokenAndUsername: true,
          };

          // We call the function of the service that handles the login process
          this.loginSE.handleLogin(loginInformation);
        }

        // We complete the subject to unsubscribe from the observable
        subject.next('');
        subject.complete();
      });
  }
}
