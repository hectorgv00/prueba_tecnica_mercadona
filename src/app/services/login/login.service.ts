import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { iLoginInformation } from '../../interfaces/iLoginInformation';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  /**
   * _loginInformation
   * @private
   * @type {BehaviorSubject<iLoginInformation>}
   * We create a BehaviorSubject to store the login information, the information is an object with the following properties:
   * hasToken: boolean, it indicates if the user has a token
   * username: string, it is the username of the user
   * hasTokenAndUsername: boolean, it indicates if the user has a token and a username, so it is logged in
   */
  private _loginInformation: BehaviorSubject<iLoginInformation> =
    new BehaviorSubject<iLoginInformation>({
      hasToken: false,
      username: '',
      hasTokenAndUsername: false,
    });

  /**
   * Constructor
   * @param router
   * This constructor is used to inject the router to navigate through the app
   * */
  constructor(private router: Router) {}

  /**
   * loginInformation
   * @returns {Observable<iLoginInformation>}
   * Getter of the loginInformation BehaviorSubject
   */
  get loginInformation() {
    return this._loginInformation.asObservable();
  }

  /**
   * login
   * @param {string} username
   * This function simulates the login process, storing the token and the username in the local storage and updating the behavior subject
   */
  private login(username: string) {
    // We set the token and the username in the local storage
    localStorage.setItem('mercadona_token', 'tenemos_token');
    localStorage.setItem('mercadona_username', username);

    // We update the behavior subject
    this._loginInformation.next({
      hasToken: true,
      username,
      hasTokenAndUsername: true,
    });
  }

  /**
   * logout
   * This function simulates the logout process, removing the token and username from the local storage and updating the behavior subject
   */
  public logout() {
    // We remove the token and the username from the local storage
    localStorage.removeItem('mercadona_token');
    localStorage.removeItem('mercadona_username');

    // We update the behavior subject
    this._loginInformation.next({
      hasToken: false,
      username: '',
      hasTokenAndUsername: false,
    });

    // We navigate to the home page
    this.router.navigate(['/']);
  }

  /**
   * handleLogin
   * @param {iLoginInformation} loginInformation
   * This function is used to handle the login information, if the user has a token and a username, it logs in, otherwise, it logs out
   */
  public handleLogin(loginInformation: iLoginInformation) {
    // We check if the user has a token and a username. If it does, we log in, otherwise, we log out
    if (loginInformation.hasTokenAndUsername) {
      this.login(loginInformation.username);
    } else {
      this.logout();
    }
  }

  /**
   * isUserLogged
   * @returns {boolean}
   * This function is used to check if the user is logged in, if the user is logged in, it returns true, otherwise, it returns false
   */
  public isUserLogged(): boolean {
    // We check if the user is logged in using the local storage
    const isLoggedInMemory =
      this._loginInformation.getValue().hasTokenAndUsername;

    // if it is logged in memory, we return true
    if (isLoggedInMemory) {
      return true;

      // Otherwise, we check the local storage
    } else {
      // We get the token and the username from the local storage
      const token = localStorage.getItem('mercadona_token');
      const username = localStorage.getItem('mercadona_username');

      // If the token and the username exist, we update the behavior subject and return true
      if (token && username) {
        this._loginInformation.next({
          hasToken: true,
          username,
          hasTokenAndUsername: true,
        });
        return true;

        // Otherwise, we return false
      } else {
        return false;
      }
    }
  }
}
