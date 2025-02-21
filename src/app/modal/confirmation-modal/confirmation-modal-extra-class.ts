import { iButtonOptions } from '../../interfaces/iButtonOptions';

export class ConfirmationModalExtraClass {
  constructor(
    public onCancelButtonClick: () => void,
    public onActionButtonClick: () => void
  ) {}

  cancelButtonOptions: iButtonOptions = {
    class: 'no-background',
    text: 'Cancelar',
    disabled: false,
    onClick: () => this.onCancelButtonClick(),
  };

  deleteButtonOptions: iButtonOptions = {
    class: 'tertiary',
    text: 'Eliminar',
    disabled: false,
    onClick: () => this.onActionButtonClick(),
  };
}
