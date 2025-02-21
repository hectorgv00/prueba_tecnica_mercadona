import { Subscription } from 'rxjs';
import { iButtonOptions } from '../../interfaces/iButtonOptions';

export class HomeExtraClass {
  constructor(public onReviewClick: () => void) {}

  /**
   * revisarButtonOptions
   * @type {iButtonOptions}
   * This variable is used to store the options of the review button.
   */
  revisarButtonOptions: iButtonOptions = {
    class: 'primary',
    text: 'Revisar',
    disabled: false,
    onClick: () => this.onReviewClick(),
    icon: 'visibility',
  };

  /**
   * tornilloCount
   * @type {number}
   * This variable is used to store the count of tornillos
   */
  tornilloCount: number = 0;

  /**
   * tornilloSubscription
   * @type {Subscription | null}
   * This variable is used to store the subscription of the login Modal
   */
  subjectSubscription: Subscription | null = null;
}
