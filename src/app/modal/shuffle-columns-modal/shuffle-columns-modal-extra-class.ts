import { iButtonOptions } from '../../interfaces/iButtonOptions';
import { iTableHeaderAndVariable } from '../../interfaces/iTableHeaderAndVariable';

export class ShuffleColumnsModalExtraClass {
  /**
   * constructor
   * @param {() => void} closePopup
   * @param {() => void} submitSortedColumns
   * This constructor is used to initialize the class with the functions that will be used in the component
   */
  constructor(
    public closePopup: () => void,
    public submitSortedColumns: () => void
  ) {}

  /**
   * cancelButtonOptions
   * @type {iButtonOptions}
   * This variable is used to store the options of the cancel button.
   */
  cancelButtonOptions: iButtonOptions = {
    class: 'no-background',
    text: 'Cancelar',
    disabled: false,
    onClick: () => this.closePopup(),
  };

  /**
   * applyButtonOptions
   * @type {iButtonOptions}
   * This variable is used to store the options of the apply button.
   */
  applyButtonOptions: iButtonOptions = {
    class: 'primary',
    text: 'Aplicar',
    disabled: false,
    onClick: () => this.submitSortedColumns(),
  };

  /**
   * sortedColumns
   * @type {iTableHeaderAndVariable[]}
   * This variable is used to store the sorted columns
   */
  sortedColumns: iTableHeaderAndVariable[] = [];
}
