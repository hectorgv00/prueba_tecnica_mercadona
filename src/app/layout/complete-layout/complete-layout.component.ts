import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { iLoginInformation } from '../../interfaces/iLoginInformation';
import { LoginModalService } from '../../services/loginModal.service';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CompleteLayoutExtraClass } from './complete-layout-extra-class';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-complete-layout',
  imports: [NgOptimizedImage, ButtonComponent],
  templateUrl: './complete-layout.component.html',
  styleUrl: './complete-layout.component.scss',
  providers: [LoginModalService],
})
export class CompleteLayoutComponent {
  extraClass = new CompleteLayoutExtraClass(
    this.openLoginDialog.bind(this),
    this.logout.bind(this)
  );

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
    this.extraClass.loginInformationSubscription =
      this.loginSE.loginInformation.subscribe((isLogged: iLoginInformation) => {
        // We update the value of the variable that indicates if the user is logged in
        this.extraClass.isLogged = isLogged.hasTokenAndUsername;

        // If the user is logged in, we get the username
        this.extraClass.buttonOptionsLogout.text = isLogged.username;
      });
  }

  openLoginDialog() {
    const subject: Subject<any> = new Subject();
    this.loginModalSE.openDialog(subject);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  logout() {
    this.loginSE.logout();
  }

  ngOnDestroy(): void {
    if (this.extraClass.loginInformationSubscription)
      this.extraClass.loginInformationSubscription.unsubscribe();
  }
}
