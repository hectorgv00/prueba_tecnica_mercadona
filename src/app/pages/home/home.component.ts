import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { iButtonOptions } from '../../interfaces/iButtonOptions';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  revisarButtonOptions: iButtonOptions = {
    class: 'primary',
    text: 'Revisar',
    disabled: false,
    onClick: () => {
      console.log('Revisar button clicked');
    },
    icon: 'visibility',
  };
}
