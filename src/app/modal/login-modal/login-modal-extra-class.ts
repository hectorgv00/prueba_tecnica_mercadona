import { FormControl, FormGroup, Validators } from '@angular/forms';
import { iButtonOptions } from '../../interfaces/iButtonOptions';
import { Subscription } from 'rxjs';

export class LoginModalExtraClass {
  /**
   * constructor
   * @param {() => void} submitForm
   * @param {() => void} onCancelButtonClick
   * This constructor is used to initialize the class with the functions that will be used in the component
   */
  constructor(
    public submitForm: () => void,
    public onCancelButtonClick: () => void
  ) {}

  /**
   * loginForm
   * @type {FormGroup}
   * This variable is used to store the form group of the login form.
   * The content will be {username: string}
   */
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
  });

  /**
   * cancelButtonOptions
   * @type {iButtonOptions}
   * This variable is used to store the options of the cancel button.
   */
  cancelButtonOptions: iButtonOptions = {
    class: 'secondary',
    text: 'cerrar',
    disabled: false,
    onClick: () => this.onCancelButtonClick(),
  };

  /**
   * submitButtonOptions
   * @type {iButtonOptions}
   * This variable is used to store the options of the submit button.
   */
  submitButtonOptions: iButtonOptions = {
    class: 'primary',
    text: 'Iniciar sesión',
    disabled: true,
    onClick: () => this.submitForm(),
  };

  /**
   * onCancelButtonClick
   * This function is used to close the modal when the cancel button is clicked
   */
  loginFormSubscription: Subscription | null = null;
}
