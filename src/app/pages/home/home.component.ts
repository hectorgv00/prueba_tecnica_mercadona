import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { TornillosService } from '../../services/tornillos/tornillos.service';
import { LoginService } from '../../services/login/login.service';
import { LoginModalService } from '../../services/login-modal/loginModal.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HomeExtraClass } from './home-extra-class';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [TornillosService, LoginModalService],
})
export class HomeComponent {
  /**
   * extraClass
   * @type {HomeExtraClass}
   * Auxiliar class where all the variables are stored
   */
  extraClass: HomeExtraClass = new HomeExtraClass(
    this.onReviewClick.bind(this)
  );

  /**
   * Constructor
   * @param tornillosSE
   * @param loginSE
   * @param loginModalSE
   * @param router
   * This constructor is used to inject the services needed to handle the tornillos, the login and the login modal, and the router to navigate through the app.
   */
  constructor(
    private tornillosSE: TornillosService,
    private loginSE: LoginService,
    private loginModalSE: LoginModalService,
    private router: Router
  ) {}

  /**
   * ngOnInit
   * This function is used to initialize the component.
   * Part of the Angular's lifecycle. It is the first method that is called when the component is created, after the constructor.
   */
  ngOnInit(): void {
    this.getTornillosCount();
  }

  /**
   * getTornillosCount
   * This function is used to get the count of the tornillos
   */
  getTornillosCount(): void {
    // We get the count of the tornillos and we set it in the extraClass
    this.extraClass.tornilloCount = this.tornillosSE.getTornillosCount();
  }

  /**
   * onReviewClick
   * This function is used to handle the click on the review button
   * It will check if the user is logged in, and if not, it will open the login modal
   */
  onReviewClick(): void {
    // We store the status of the user's session
    const isUserLogged = this.checkIfUserIsLogged();

    // If the user is logged, we go to the tornillos page
    if (isUserLogged) {
      this.goToTornillosPage();

      // If the user is not logged, we open the login modal
    } else {
      this.handleLogin();
    }
  }

  /**
   * checkIfUserIsLogged
   * This function is used to check if the user is logged in
   * @returns {boolean} Returns true if the user is logged in, and false if not
   */
  checkIfUserIsLogged(): boolean {
    return this.loginSE.isUserLogged();
  }

  /**
   * goToTornillosPage
   * This function is used to navigate to the tornillos page
   */
  goToTornillosPage(): void {
    this.router.navigate(['/tornillos']);
  }

  /**
   * handleLogin
   * This function is used to handle the login
   */
  handleLogin(): void {
    // We create a subject to handle the response of the login modal
    const subject = new Subject();

    // We open the login modal
    this.loginModalSE.openDialog(subject);

    // We subscribe to the subject to know if the user has logged in
    this.extraClass.subjectSubscription = subject.subscribe((value) => {
      // If the user has logged in, we go to the tornillos page
      if (value) this.goToTornillosPage();
    });
  }

  /**
   * ngOnDestroy
   * This function is used to unsubscribe from the subscription when the component is destroyed
   * This is part of the Angular's lifecycle, and it is the last method that is called when the component is destroyed.
   */
  ngOnDestroy(): void {
    if (this.extraClass.subjectSubscription)
      this.extraClass.subjectSubscription.unsubscribe();
  }
}
