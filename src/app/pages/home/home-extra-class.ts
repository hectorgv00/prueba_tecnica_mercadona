import { Subscription } from 'rxjs';
import { iButtonOptions } from '../../interfaces/iButtonOptions';

export class HomeExtraClass {
  constructor(public onReviewClick: () => void) {}

  revisarButtonOptions: iButtonOptions = {
    class: 'primary',
    text: 'Revisar',
    disabled: false,
    onClick: () => this.onReviewClick(),
    icon: 'visibility',
  };

  tornilloCount: number = 0;

  // subscription
  subjectSubscription: Subscription | null = null;
}
