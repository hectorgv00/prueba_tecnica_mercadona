import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '../../components/button/button.component';
import { LoginModalExtraClass } from './login-modal-extra-class';

@Component({
  selector: 'app-login-modal',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonComponent,
  ],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
})
export class LoginModalComponent {
  /**
   * extraClass
   * @type {LoginModalExtraClass}
   * Auxiliar class where all the variables are stored
   */
  extraClass: LoginModalExtraClass = new LoginModalExtraClass(
    this.submitForm.bind(this),
    this.onCancelButtonClick.bind(this)
  );

  /**
   * Constructor
   * @param data
   * @param dialogRef
   * This constructor is used to inject the data needed to display the modal and the dialog reference to close the modal
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<LoginModalComponent>
  ) {}

  /**
   * ngOnInit
   * This function is used to initialize the component.
   * Part of the Angular's lifecycle. It is the first method that is called when the component is created, after the constructor.
   */
  ngOnInit() {
    this.suscribeToForm();
  }

  /**
   * submitForm
   * This function is used to submit the form when the submit button is clicked
   * It will close the modal and return the value of the form
   */
  submitForm() {
    if (this.extraClass.loginForm.valid) {
      this.dialogRef.close(this.extraClass.loginForm.value);
    }
  }

  /**
   * suscribeToForm
   * This function is used to subscribe to the form changes
   * It will enable or disable the submit button depending on the form status
   */
  suscribeToForm() {
    // We subscribe to the form status to enable or disable the submit button
    this.extraClass.loginFormSubscription =
      this.extraClass.loginForm.statusChanges.subscribe((status) => {
        // We enable or disable the submit button depending on the form status. If the form is valid, the button is enabled and vice versa
        this.extraClass.submitButtonOptions.disabled = status !== 'VALID';
      });
  }

  /**
   * onCancelButtonClick
   * This function is used to close the modal when the cancel button is clicked
   */
  onCancelButtonClick() {
    this.dialogRef.close(false);
  }

  /**
   * ngOnDestroy
   * This function is used to unsubscribe from the form subscription when the component is destroyed
   */
  ngOnDestroy(): void {
    if (this.extraClass.loginFormSubscription)
      this.extraClass.loginFormSubscription.unsubscribe();
  }
}
