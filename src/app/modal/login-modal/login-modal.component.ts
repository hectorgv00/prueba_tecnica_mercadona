import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '../../components/button/button.component';
import { iButtonOptions } from '../../interfaces/iButtonOptions';
import { Subscription } from 'rxjs';

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
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
  });

  cancelButtonOptions: iButtonOptions = {
    class: 'secondary',
    text: 'cerrar',
    disabled: false,
    onClick: () => this.dialogRef.close(false),
  };

  submitButtonOptions: iButtonOptions = {
    class: 'primary',
    text: 'Iniciar sesión',
    disabled: true,
    onClick: () => this.submitForm(),
  };

  // subscribe
  loginFormSubscription: Subscription | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<LoginModalComponent>
  ) {}

  ngOnInit() {
    this.suscribeToForm();
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.dialogRef.close(this.loginForm.value);
    }
  }

  suscribeToForm() {
    this.loginFormSubscription = this.loginForm.statusChanges.subscribe(
      (status) => {
        this.submitButtonOptions.disabled = status !== 'VALID';
      }
    );
  }

  ngOnDestroy(): void {
    if (this.loginFormSubscription) this.loginFormSubscription.unsubscribe();
  }
}
