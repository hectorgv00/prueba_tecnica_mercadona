import { FormControl, FormGroup, Validators } from '@angular/forms';
import { iButtonOptions } from '../../interfaces/iButtonOptions';
import { Subscription } from 'rxjs';

export class NewTornilloModalExtraClass {
  /**
   * constructor
   * @param {() => void} closePopup
   * @param {() => void} saveForm
   * This constructor is used to initialize the class with the functions that will be used in the component
   */
  constructor(public closePopup: () => void, public saveForm: () => void) {}

  /**
   * newTornilloForm
   * @type {FormGroup}
   * This variable is used to store the form group of the new tornillo form.
   * The content will be {nombre: string, precio: number, formato: string, marca: string}
   */
  newTornilloForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    precio: new FormControl(0, [Validators.required, Validators.min(0)]),
    formato: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
  });

  /**
   * cancelButtonOptions
   * @type {iButtonOptions}
   * This variable is used to store the options of the cancel button.
   */
  cancelButtonOptions: iButtonOptions = {
    class: 'secondary',
    text: 'Cancelar',
    disabled: false,
    onClick: () => this.closePopup(),
  };

  /**
   * saveButtonOptions
   * @type {iButtonOptions}
   * This variable is used to store the options of the save button.
   */
  saveButtonOptions: iButtonOptions = {
    class: 'primary',
    text: 'Guardar',
    disabled: true,
    onClick: () => this.saveForm(),
    type: 'submit',
  };

  /**
   * newTornilloFormSubscription
   * @type {Subscription | null}
   * This variable is used to store the subscription of the newTornilloForm
   */
  newTornilloFormSubscription: Subscription | null = null;

  /**
   * formats
   * @type {string[]}
   * This variable is used to store the formats of the tornillos
   */
  formats: string[] = [];
}
