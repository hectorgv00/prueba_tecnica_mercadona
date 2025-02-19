import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TornillosPageComponent } from './pages/tornillos-page/tornillos-page.component';
import { authGuard } from './guards/auth-guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'tornillos',
    component: TornillosPageComponent,
    canActivate: [authGuard],
  },
];
