import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ButtonComponent } from '../../components/button/button.component';
import { iButtonOptions } from '../../interfaces/iButtonOptions';
import { iConfirmationModalContent } from '../../interfaces/iConfirmationModalContent';
import { ConfirmationModalExtraClass } from './confirmation-modal-extra-class';

@Component({
  selector: 'app-confirmation-modal',
  imports: [MatDialogModule, ButtonComponent],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
})
export class ConfirmationModalComponent {
  extraClass: ConfirmationModalExtraClass = new ConfirmationModalExtraClass(
    this.onCloseButtonClick.bind(this),
    this.onActionButtonClick.bind(this)
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: iConfirmationModalContent,
    private dialogRef: MatDialogRef<ConfirmationModalComponent>
  ) {}

  ngOnInit(): void {
    this.setButtonsText();
  }

  setButtonsText(): void {
    this.extraClass.deleteButtonOptions.text = this.data.action;
  }

  onCloseButtonClick(): void {
    this.dialogRef.close(false);
  }

  onActionButtonClick(): void {
    this.dialogRef.close(true);
  }
}
