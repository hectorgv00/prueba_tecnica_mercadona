import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CompleteLayoutComponent } from './layout/complete-layout/complete-layout.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CompleteLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'prueba_tecnica_mercadona';
}
