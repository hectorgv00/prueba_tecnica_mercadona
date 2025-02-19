import { BehaviorSubject } from 'rxjs';
import { iLoginInformation } from '../interfaces/iLoginInformation';
import { Injectable } from '@angular/core';
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
  }

  // Function that handles the login process, if the user has a token and a username, we log in, otherwise we log out
  public handleLogin(loginInformation: iLoginInformation) {
    if (loginInformation.hasTokenAndUsername) {
      this.login(loginInformation.username);
    } else {
      this.logout();
    }
  }

  public isUserLogged(): boolean {
    return this._loginInformation.getValue().hasTokenAndUsername;
  }
}
