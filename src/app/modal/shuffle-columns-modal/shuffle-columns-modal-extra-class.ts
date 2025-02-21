import { iButtonOptions } from '../../interfaces/iButtonOptions';
import { iTableHeaderAndVariable } from '../../interfaces/iTableHeaderAndVariable';

export class ShuffleColumnsModalExtraClass {
  constructor(
    public closePopup: () => void,
    public submitSortedColumns: () => void
  ) {}

  cancelButtonOptions: iButtonOptions = {
    class: 'no-background',
    text: 'Cancelar',
    disabled: false,
    onClick: () => this.closePopup(),
  };

  applyButtonOptions: iButtonOptions = {
    class: 'primary',
    text: 'Aplicar',
    disabled: false,
    onClick: () => this.submitSortedColumns(),
  };

  sortedColumns: iTableHeaderAndVariable[] = [];
}
