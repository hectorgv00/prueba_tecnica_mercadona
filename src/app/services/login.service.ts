import { BehaviorSubject } from 'rxjs';
import { iLoginInformation } from '../interfaces/iLoginInformation';

export class LoginService {
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  private _username: string = '';

  get isLoggedIn() {
    return this._isLoggedIn.asObservable();
  }

  get username() {
    return this._username;
  }

  set username(username: string) {
    this._username = username;
  }

  private login() {
    localStorage.setItem('mercadona_token', 'tenemos_token');
    this._isLoggedIn.next(true);
  }

  private logout() {
    localStorage.removeItem('mercadona_token');
    this._isLoggedIn.next(false);
  }

  public handleLogin(loginInformation: iLoginInformation) {
    if (loginInformation.hasTokenAndUsername) {
      this.login();
      this.username = loginInformation.username;
    } else {
      this.logout();
    }
  }
}
