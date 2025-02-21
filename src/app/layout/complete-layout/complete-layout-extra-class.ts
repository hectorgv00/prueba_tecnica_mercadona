import { Subscription } from 'rxjs';
import { iButtonOptions } from '../../interfaces/iButtonOptions';

export class CompleteLayoutExtraClass {
  constructor(
    private openLoginDialog: () => void,
    private logout: () => void
  ) {}

  //  Variable that indicates if the user is logged in
  isLogged: boolean = false;

  //   Button options
  buttonOptionsLogin: iButtonOptions = {
    text: 'Iniciar sesión',
    onClick: () => this.openLoginDialog(),
    class: 'secondary',
    disabled: false,
  };

  buttonOptionsLogout: iButtonOptions = {
    text: '',
    onClick: () => this.logout(),
    class: 'no-background',
    disabled: false,
    icon: 'logout',
    reverseIcon: true,
  };

  // suscription
  loginInformationSubscription: Subscription | null = null;
}
