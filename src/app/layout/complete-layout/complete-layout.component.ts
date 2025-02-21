import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { iLoginInformation } from '../../interfaces/iLoginInformation';
import { LoginModalService } from '../../services/login-modal/loginModal.service';
import { Subject } from 'rxjs';
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
  /**
   * extraClass
   * @type {CompleteLayoutExtraClass}
   * Auxiliar class where all the variables are stored
   */
  extraClass = new CompleteLayoutExtraClass(
    this.openLoginDialog.bind(this),
    this.logout.bind(this)
  );

  /**
   * Constructor
   * @param loginSE
   * @param loginModalSE
   * @param router
   * This constructor is used to inject the services needed to handle the login and the login modal, and the router to navigate through the app.
   */
  constructor(
    private loginSE: LoginService,
    private loginModalSE: LoginModalService,
    private router: Router
  ) {}

  /**
   * ngOnInit
   * This function is used to initialize the component.
   * Part of the Angular's lifecycle. It is the first method that is called when the component is created, after the constructor.
   */
  ngOnInit() {
    // We establish the connexion with the behavior subject of the service that handles the information of the user's session
    this.connectToLoginServiceBS();
  }

  /**
   * connectToLoginServiceBS
   * This function is used to connect to the behavior subject of the login service.
   * It is used to know if the user is logged in, and to update the information of the user in the component
   *
   */
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

  /**
   * openLoginDialog
   * This function is used to open the login dialog using the login modal service
   */
  openLoginDialog() {
    const subject: Subject<any> = new Subject();
    this.loginModalSE.openDialog(subject);
  }

  /**
   * goToHome
   * This function is used to navigate to the home page
   */
  goToHome() {
    this.router.navigate(['/']);
  }

  /**
   * logout
   * This function is used to logout the user
   */
  logout() {
    this.loginSE.logout();
  }

  /**
   * ngOnDestroy
   * This function is used to unsubscribe from the subscription when the component is destroyed
   * This is part of the Angular's lifecycle, and it is the last method that is called when the component is destroyed.
   */
  ngOnDestroy(): void {
    if (this.extraClass.loginInformationSubscription)
      this.extraClass.loginInformationSubscription.unsubscribe();
  }
}
