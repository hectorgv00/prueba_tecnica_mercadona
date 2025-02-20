import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ButtonComponent } from '../../components/button/button.component';
import { iButtonOptions } from '../../interfaces/iButtonOptions';

@Component({
  selector: 'app-confirmation-modal',
  imports: [MatDialogModule, ButtonComponent],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
})
export class ConfirmationModalComponent {
  cancelButtonOptions: iButtonOptions = {
    class: 'no-background',
    text: 'Cancelar',
    disabled: false,
    onClick: () => this.dialogRef.close(false),
  };

  deleteButtonOptions: iButtonOptions = {
    class: 'tertiary',
    text: 'Eliminar',
    disabled: false,
    onClick: () => this.dialogRef.close(true),
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmationModalComponent>
  ) {}
}
