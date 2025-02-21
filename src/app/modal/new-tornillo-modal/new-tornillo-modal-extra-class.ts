import { FormControl, FormGroup, Validators } from '@angular/forms';
import { iButtonOptions } from '../../interfaces/iButtonOptions';
import { Subscription } from 'rxjs';

export class NewTornilloModalExtraClass {
  constructor(public closePopup: () => void, public saveForm: () => void) {}

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
}
