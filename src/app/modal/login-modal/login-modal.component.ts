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
  extraClass: LoginModalExtraClass = new LoginModalExtraClass(
    this.submitForm.bind(this),
    this.onCancelButtonClick.bind(this)
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<LoginModalComponent>
  ) {}

  ngOnInit() {
    this.suscribeToForm();
  }

  submitForm() {
    if (this.extraClass.loginForm.valid) {
      this.dialogRef.close(this.extraClass.loginForm.value);
    }
  }

  suscribeToForm() {
    this.extraClass.loginFormSubscription =
      this.extraClass.loginForm.statusChanges.subscribe((status) => {
        this.extraClass.submitButtonOptions.disabled = status !== 'VALID';
      });
  }

  onCancelButtonClick() {
    this.dialogRef.close(false);
  }

  ngOnDestroy(): void {
    if (this.extraClass.loginFormSubscription)
      this.extraClass.loginFormSubscription.unsubscribe();
  }
}
