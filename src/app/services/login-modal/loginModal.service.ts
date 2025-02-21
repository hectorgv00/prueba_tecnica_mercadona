import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { LoginModalComponent } from '../../modal/login-modal/login-modal.component';
import { iLoginInformation } from '../../interfaces/iLoginInformation';
import { Injectable } from '@angular/core';
import { LoginService } from '.././login/login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginModalService {
  /**
   * dialogSubscription
   * @type {Subscription | null}
   * This variable is used to store the subscription of the dialog to unsubscribe from the observable when the modal is closed
   */
  private dialogSubscription: Subscription | null = null;

  /**
   * Constructor
   * @param dialog
   * @param loginSE
   * This constructor is used to inject the dialog service to open the modal, and the service that handles the login
   */
  constructor(private dialog: MatDialog, private loginSE: LoginService) {}

  /**
   * openDialog
   * @param {Subject<any>} subject
   * This function is used to open the login modal using the dialog service
   */
  openDialog(subject: Subject<any>): void {
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

  /**
   * ngOnDestroy
   * This function is used to unsubscribe from the observable when the component is destroyed
   */
  ngOnDestroy(): void {
    if (this.dialogSubscription) this.dialogSubscription.unsubscribe();
  }
}
