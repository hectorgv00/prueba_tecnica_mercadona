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
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { TornillosService } from '../../services/tornillos/tornillos.service';
import { NewTornilloModalExtraClass } from './new-tornillo-modal-extra-class';

@Component({
  selector: 'app-new-tornillo-modal',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonComponent,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './new-tornillo-modal.component.html',
  styleUrl: './new-tornillo-modal.component.scss',
})
export class NewTornilloModalComponent {
  /**
   * extraClass
   * @type {NewTornilloModalExtraClass}
   * Auxiliar class where all the variables are stored
   * This class is used to store all the variables and functions needed for the component to work
   */
  extraClass: NewTornilloModalExtraClass = new NewTornilloModalExtraClass(
    this.closePopup.bind(this),
    this.saveForm.bind(this)
  );

  /**
   * Constructor
   * @param data
   * @param dialogRef
   * @param tornillosSE
   * This constructor is used to inject the data needed to display the modal and the dialog reference to close the modal
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NewTornilloModalComponent>,
    private tornillosSE: TornillosService
  ) {}

  /**
   * ngOnInit
   * This function is used to initialize the component.
   * Part of the Angular's lifecycle. It is the first method that is called when the component is created, after the constructor.
   */
  ngOnInit() {
    this.suscribeToForm();
    this.getFormats();
  }

  /**
   * closePopup
   * This function is used to close the modal when the close button is clicked
   */
  closePopup(): void {
    this.dialogRef.close(false);
  }

  /**
   * saveForm
   * This function is used to save the form when the save button is clicked
   */
  saveForm(): void {
    this.dialogRef.close(this.extraClass.newTornilloForm.value);
  }

  /**
   * removePrice
   * This function is used to remove 0.1 to the price of the tornillo
   */
  removePrice(): void {
    // We store the value of the precio input
    const currentValue =
      this.extraClass.newTornilloForm.controls['precio'].value;

    // We calculate the value to set, rounding it to the first decimal
    const valueToSet = Math.round((currentValue - 0.1) * 10) / 10;

    // If the value is less than 0 we set the value to 0 and return
    if (currentValue <= 0) {
      this.extraClass.newTornilloForm.controls['precio'].setValue(0);
      return;
    }

    // We set the value to the input
    this.extraClass.newTornilloForm.controls['precio'].setValue(valueToSet);
  }

  /**
   * addPrice
   * This function is used to add 0.1 to the price of the tornillo
   */
  addPrice(): void {
    // We store the value of the precio input
    const currentValue =
      this.extraClass.newTornilloForm.controls['precio'].value;

    // We calculate the value to set, rounding it to the first decimal
    const valueToSet = Math.round((currentValue + 0.1) * 10) / 10;

    // We set the value to the input
    this.extraClass.newTornilloForm.controls['precio'].setValue(valueToSet);
  }

  /**
   * suscribeToForm
   * This function is used to subscribe to the form changes
   */
  suscribeToForm() {
    // We subscribe to the form changes
    this.extraClass.newTornilloFormSubscription =
      this.extraClass.newTornilloForm.statusChanges.subscribe((status) => {
        // We enable or disable the save button depending on the form status. If the status is VALID, we enable the button. Otherwise, we disable it.
        this.extraClass.saveButtonOptions.disabled = status !== 'VALID';
      });
  }

  /**
   * checkPrice
   * @param event
   * This function is used to check if the price is less than 0.
   */
  checkPrice(event: Event): void {
    // We store the value of the precio input
    const value = this.extraClass.newTornilloForm.controls['precio'].value;

    // If the value is less than 0 we set the value to 0
    if (value < 0) {
      this.extraClass.newTornilloForm.controls['precio'].setValue(0);
    }
  }

  /**
   * getFormats
   * This function is used to get the formats of the tornillos
   */
  getFormats(): void {
    this.extraClass.formats = this.tornillosSE.getFormatosUnique();
  }
}
