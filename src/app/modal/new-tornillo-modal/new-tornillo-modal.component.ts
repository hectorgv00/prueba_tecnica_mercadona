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
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { TornillosService } from '../../services/tornillos.service';

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
  newTornilloForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    precio: new FormControl(0, [Validators.required, Validators.min(0)]),
    formato: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
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
    type: 'submit',
  };

  // subscribe
  newTornilloFormSubscription: Subscription | null = null;

  formats: string[] = [];

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
    this.dialogRef.close(this.newTornilloForm.value);
  }

  removePrice(): void {
    const currentValue = this.newTornilloForm.controls['precio'].value;
    const valueToSet = Math.round((currentValue - 0.1) * 10) / 10;

    if (currentValue <= 0) {
      this.newTornilloForm.controls['precio'].setValue(0);
      return;
    }

    this.newTornilloForm.controls['precio'].setValue(valueToSet);
  }

  addPrice(): void {
    const currentValue = this.newTornilloForm.controls['precio'].value;
    const valueToSet = Math.round((currentValue + 0.1) * 10) / 10;
    console.log(valueToSet);
    this.newTornilloForm.controls['precio'].setValue(valueToSet);
  }

  suscribeToForm() {
    this.newTornilloFormSubscription =
      this.newTornilloForm.statusChanges.subscribe((status) => {
        this.saveButtonOptions.disabled = status !== 'VALID';
      });
  }

  checkPrice(event: Event): void {
    const value = this.newTornilloForm.controls['precio'].value;
    if (value < 0) {
      this.newTornilloForm.controls['precio'].setValue(0);
    }
  }

  getFormats(): void {
    this.formats = this.tornillosSE.getFormatosUnique();
  }
}
