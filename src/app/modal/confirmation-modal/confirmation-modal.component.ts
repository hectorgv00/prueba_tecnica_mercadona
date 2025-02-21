import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ButtonComponent } from '../../components/button/button.component';
import { iConfirmationModalContent } from '../../interfaces/iConfirmationModalContent';
import { ConfirmationModalExtraClass } from './confirmation-modal-extra-class';

@Component({
  selector: 'app-confirmation-modal',
  imports: [MatDialogModule, ButtonComponent],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
})
export class ConfirmationModalComponent {
  /**
   * extraClass
   * @type {ConfirmationModalExtraClass}
   * Auxiliar class where all the variables are stored
   */
  extraClass: ConfirmationModalExtraClass = new ConfirmationModalExtraClass(
    this.onCloseButtonClick.bind(this),
    this.onActionButtonClick.bind(this)
  );

  /**
   * Constructor
   * @param data
   * @param dialogRef
   * This constructor is used to inject the data needed to display the modal and the dialog reference to close the modal
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: iConfirmationModalContent,
    private dialogRef: MatDialogRef<ConfirmationModalComponent>
  ) {}

  /**
   * ngOnInit
   * This function is used to initialize the component.
   * Part of the Angular's lifecycle. It is the first method that is called when the component is created, after the constructor.
   */
  ngOnInit(): void {
    this.setButtonsText();
  }

  /**
   * setButtonsText
   * This function is used to set the text of the buttons of the modal
   */
  setButtonsText(): void {
    // We get the action from the data object and we set it in the options to display it
    this.extraClass.deleteButtonOptions.text = this.data.action;
  }

  /**
   * onCloseButtonClick
   * This function is used to close the modal when the close button is clicked
   */
  onCloseButtonClick(): void {
    // We send false to the parent component to indicate that the action was canceled
    this.dialogRef.close(false);
  }

  /**
   * onActionButtonClick
   * This function is used to close the modal when the action button is clicked
   */
  onActionButtonClick(): void {
    // We send true to the parent component to indicate that the action was confirmed
    this.dialogRef.close(true);
  }
}
