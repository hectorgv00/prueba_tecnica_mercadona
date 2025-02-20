import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { LoginService } from './login.service';
import { LoginModalComponent } from '../modal/login-modal/login-modal.component';
import { iLoginInformation } from '../interfaces/iLoginInformation';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginModalService {
  private dialogSubscription: Subscription | null = null;

  constructor(private dialog: MatDialog, private loginSE: LoginService) {}

  // Function that opens the login modal
  openDialog(subject: Subject<any>): void {
    // We create a subject to unsubscribe from the observable when the modal is closed

    // we store the reference of the dialog to get the information once is closed
    const dialog = this.dialog.open(LoginModalComponent);

    // We subscribe to the observable of the dialog to get the information once is closed
    this.dialogSubscription = dialog
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
        subject.next(true);
        subject.complete();
      });
  }

  ngOnDestroy(): void {
    if (this.dialogSubscription) this.dialogSubscription.unsubscribe();
  }
}
