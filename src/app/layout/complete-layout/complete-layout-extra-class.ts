import { Subscription } from 'rxjs';
import { iButtonOptions } from '../../interfaces/iButtonOptions';

export class CompleteLayoutExtraClass {
  constructor(public openLoginDialog: () => void, public logout: () => void) {}

  /**
   * Variable that indicates if the user is logged in
   */
  isLogged: boolean = false;

  /**
   * Button options to login
   */
  buttonOptionsLogin: iButtonOptions = {
    text: 'Iniciar sesión',
    onClick: () => this.openLoginDialog(),
    class: 'secondary',
    disabled: false,
  };

  /**
   * Button options to logout
   */
  buttonOptionsLogout: iButtonOptions = {
    text: '',
    onClick: () => this.logout(),
    class: 'no-background',
    disabled: false,
    icon: 'logout',
    reverseIcon: true,
  };

  /**
   * Subscription of the login information
   */
  loginInformationSubscription: Subscription | null = null;
}
