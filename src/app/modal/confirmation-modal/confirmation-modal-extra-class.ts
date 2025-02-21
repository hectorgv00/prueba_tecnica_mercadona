import { iButtonOptions } from '../../interfaces/iButtonOptions';

export class ConfirmationModalExtraClass {
  /**
   * constructor
   * @param {() => void} onCancelButtonClick
   * @param {() => void} onActionButtonClick
   */
  constructor(
    public onCancelButtonClick: () => void,
    public onActionButtonClick: () => void
  ) {}

  /**
   * cancelButtonOptions
   * @type {iButtonOptions}
   * This variable is used to store the options of the cancel button.
   *
   */
  cancelButtonOptions: iButtonOptions = {
    class: 'no-background',
    text: 'Cancelar',
    disabled: false,
    onClick: () => this.onCancelButtonClick(),
  };

  /**
   * deleteButtonOptions
   * @type {iButtonOptions}
   * This variable is used to store the options of the delete button.
   *
   */
  deleteButtonOptions: iButtonOptions = {
    class: 'tertiary',
    text: 'Eliminar',
    disabled: false,
    onClick: () => this.onActionButtonClick(),
  };
}
