import { Component, Input } from '@angular/core';
import { iButtonOptions } from '../../interfaces/iButtonOptions';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  /***
   * @Input buttonOptions: iButtonOptions
   * @type {iButtonOptions}
   * Input to receive the options to be displayed in the button.
   */
  @Input({ required: true }) buttonOptions!: iButtonOptions;
}
