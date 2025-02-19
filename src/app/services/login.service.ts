import { BehaviorSubject } from 'rxjs';
import { iLoginInformation } from '../interfaces/iLoginInformation';

export class LoginService {
  private _loginInformation: BehaviorSubject<iLoginInformation> =
    new BehaviorSubject<iLoginInformation>({
      hasToken: false,
      username: '',
      hasTokenAndUsername: false,
    });

  get loginInformation() {
    return this._loginInformation.asObservable();
  }

  private login(username: string) {
    localStorage.setItem('mercadona_token', 'tenemos_token');
    localStorage.setItem('mercadona_username', username);
    this._loginInformation.next({
      hasToken: true,
      username,
      hasTokenAndUsername: true,
    });
  }

  public logout() {
    localStorage.removeItem('mercadona_token');
    localStorage.removeItem('mercadona_username');
    this._loginInformation.next({
      hasToken: false,
      username: '',
      hasTokenAndUsername: false,
    });
  }

  public handleLogin(loginInformation: iLoginInformation) {
    if (loginInformation.hasTokenAndUsername) {
      this.login(loginInformation.username);
    } else {
      this.logout();
    }
  }
}
