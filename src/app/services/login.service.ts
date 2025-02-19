import { BehaviorSubject } from 'rxjs';

export class LoginService {
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  get isLoggedIn() {
    return this._isLoggedIn.asObservable();
  }

  login() {
    localStorage.setItem('mercadona_token', 'tenemos_token');
    this._isLoggedIn.next(true);
  }

  logout() {
    localStorage.removeItem('mercadona_token');
    this._isLoggedIn.next(false);
  }
}
