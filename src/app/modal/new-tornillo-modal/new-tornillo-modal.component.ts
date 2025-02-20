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
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-new-tornillo-modal',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonComponent,
    MatIconModule,
  ],
  templateUrl: './new-tornillo-modal.component.html',
  styleUrl: './new-tornillo-modal.component.scss',
})
export class NewTornilloModalComponent {
  newTornilloForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
  });

  cancelButtonOptions: iButtonOptions = {
    class: 'secondary',
    text: 'Cancelar',
    disabled: false,
    onClick: () => this.closePopup(),
  };

  saveButtonOptions: iButtonOptions = {
    class: 'primary',
    text: 'Guardar',
    disabled: true,
    onClick: () => this.saveForm(),
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NewTornilloModalComponent>
  ) {}

  closePopup(): void {
    this.dialogRef.close(false);
  }

  saveForm(): void {
    this.dialogRef.close(this.newTornilloForm.value);
  }
}
