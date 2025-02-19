import { BehaviorSubject } from 'rxjs';
import { iLoginInformation } from '../interfaces/iLoginInformation';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // We create a BehaviorSubject to store the login information, the information is an object with the following properties:
  // hasToken: boolean, it indicates if the user has a token
  // username: string, it is the username of the user
  // hasTokenAndUsername: boolean, it indicates if the user has a token and a username, so it is logged in
  private _loginInformation: BehaviorSubject<iLoginInformation> =
    new BehaviorSubject<iLoginInformation>({
      hasToken: false,
      username: '',
      hasTokenAndUsername: false,
    });

  constructor(private router: Router) {}

  // We create an observable to subscribe to the behavior subject
  get loginInformation() {
    return this._loginInformation.asObservable();
  }

  // We simulate the login process, setting the username provided and all the rest of the information as if the user is logged in
  private login(username: string) {
    localStorage.setItem('mercadona_token', 'tenemos_token');
    localStorage.setItem('mercadona_username', username);
    this._loginInformation.next({
      hasToken: true,
      username,
      hasTokenAndUsername: true,
    });
  }

  // We simulate the logout process, removing the token and username from the local storage and updating the behavior subject
  public logout() {
    localStorage.removeItem('mercadona_token');
    localStorage.removeItem('mercadona_username');
    this._loginInformation.next({
      hasToken: false,
      username: '',
      hasTokenAndUsername: false,
    });
    this.router.navigate(['/']);
  }

  // Function that handles the login process, if the user has a token and a username, we log in, otherwise we log out
  public handleLogin(loginInformation: iLoginInformation) {
    console.log(loginInformation);
    if (loginInformation.hasTokenAndUsername) {
      this.login(loginInformation.username);
    } else {
      this.logout();
    }
  }

  public isUserLogged(): boolean {
    const isLoggedInMemory =
      this._loginInformation.getValue().hasTokenAndUsername;

    if (isLoggedInMemory) {
      return true;
    } else {
      const token = localStorage.getItem('mercadona_token');
      const username = localStorage.getItem('mercadona_username');

      if (token && username) {
        this._loginInformation.next({
          hasToken: true,
          username,
          hasTokenAndUsername: true,
        });
        return true;
      } else {
        return false;
      }
    }
  }
}
