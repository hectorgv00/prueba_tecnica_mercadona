import { Component, Input } from '@angular/core';
import { iButtonOptions } from '../../interfaces/iButtonOptions';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button',
  imports: [MatButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input({ required: true }) buttonOptions!: iButtonOptions;
}
