import { Component, model, Signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { iButtonOptions } from '../../interfaces/iButtonOptions';

@Component({
  selector: 'app-complete-layout',
  imports: [NgOptimizedImage, ButtonComponent],
  templateUrl: './complete-layout.component.html',
  styleUrl: './complete-layout.component.scss',
})
export class CompleteLayoutComponent {
  public buttonOptions: iButtonOptions = {
    text: 'Iniciar sesión',
    onClick: () => console.log('Button clicked!'),
    class: 'secondary',
    disabled: false,
  };
}
