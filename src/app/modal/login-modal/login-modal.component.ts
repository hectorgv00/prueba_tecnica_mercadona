import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonComponent } from '../../components/button/button.component';
import { iButtonOptions } from '../../interfaces/iButtonOptions';
import { MatInputModule } from '@angular/material/input';

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
    onClick: () => {},
  };

  submitButtonOptions: iButtonOptions = {
    class: 'primary',
    text: 'Iniciar sesión',
    disabled: true,
    onClick: () => {},
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
