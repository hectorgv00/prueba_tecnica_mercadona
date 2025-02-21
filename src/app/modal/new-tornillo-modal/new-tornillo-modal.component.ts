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
  extraClass: NewTornilloModalExtraClass = new NewTornilloModalExtraClass(
    this.closePopup.bind(this),
    this.saveForm.bind(this)
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NewTornilloModalComponent>,
    private tornillosSE: TornillosService
  ) {}

  ngOnInit() {
    this.suscribeToForm();
    this.getFormats();
  }

  closePopup(): void {
    this.dialogRef.close(false);
  }

  saveForm(): void {
    this.dialogRef.close(this.extraClass.newTornilloForm.value);
  }

  removePrice(): void {
    const currentValue =
      this.extraClass.newTornilloForm.controls['precio'].value;
    const valueToSet = Math.round((currentValue - 0.1) * 10) / 10;

    if (currentValue <= 0) {
      this.extraClass.newTornilloForm.controls['precio'].setValue(0);
      return;
    }

    this.extraClass.newTornilloForm.controls['precio'].setValue(valueToSet);
  }

  addPrice(): void {
    const currentValue =
      this.extraClass.newTornilloForm.controls['precio'].value;
    const valueToSet = Math.round((currentValue + 0.1) * 10) / 10;
    this.extraClass.newTornilloForm.controls['precio'].setValue(valueToSet);
  }

  suscribeToForm() {
    this.extraClass.newTornilloFormSubscription =
      this.extraClass.newTornilloForm.statusChanges.subscribe((status) => {
        this.extraClass.saveButtonOptions.disabled = status !== 'VALID';
      });
  }

  checkPrice(event: Event): void {
    const value = this.extraClass.newTornilloForm.controls['precio'].value;
    if (value < 0) {
      this.extraClass.newTornilloForm.controls['precio'].setValue(0);
    }
  }

  getFormats(): void {
    this.extraClass.formats = this.tornillosSE.getFormatosUnique();
  }
}
