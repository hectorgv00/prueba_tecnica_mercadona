import { FormControl, FormGroup, Validators } from '@angular/forms';
import { iButtonOptions } from '../../interfaces/iButtonOptions';
import { Subscription } from 'rxjs';

export class LoginModalExtraClass {
  constructor(
    public submitForm: () => void,
    public onCancelButtonClick: () => void
  ) {}

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
  });

  cancelButtonOptions: iButtonOptions = {
    class: 'secondary',
    text: 'cerrar',
    disabled: false,
    onClick: () => this.onCancelButtonClick(),
  };

  submitButtonOptions: iButtonOptions = {
    class: 'primary',
    text: 'Iniciar sesión',
    disabled: true,
    onClick: () => this.submitForm(),
  };

  // subscribe
  loginFormSubscription: Subscription | null = null;
}
