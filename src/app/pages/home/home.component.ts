import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { iButtonOptions } from '../../interfaces/iButtonOptions';
import { TornillosService } from '../../services/tornillos.service';
import { LoginService } from '../../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { LoginModalComponent } from '../../modal/login-modal/login-modal.component';
import { iLoginInformation } from '../../interfaces/iLoginInformation';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [TornillosService],
})
export class HomeComponent {
  revisarButtonOptions: iButtonOptions = {
    class: 'primary',
    text: 'Revisar',
    disabled: false,
    onClick: () => this.onReviewClick(),
    icon: 'visibility',
  };

  tornilloCount: number = 0;

  constructor(
    private tornillosSE: TornillosService,
    private loginSE: LoginService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTornillosCount();
  }

  getTornillosCount(): void {
    this.tornilloCount = this.tornillosSE.getTornillosCount();
  }

  onReviewClick(): void {
    const isUserLogged = this.checkIfUserIsLogged();
    if (isUserLogged) {
      console.log('User is logged');
    } else {
      this.openDialog();
    }
  }

  checkIfUserIsLogged(): boolean {
    return this.loginSE.isUserLogged();
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
