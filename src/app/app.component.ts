import { Component, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CompleteLayoutComponent } from './layout/complete-layout/complete-layout.component';
import { iLoginInformation } from './interfaces/iLoginInformation';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from './config/spanish-translation-angular-material';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { iTableHeaderAndVariable } from './interfaces/iTableHeaderAndVariable';
import { TornillosTableHeaderDB } from './db/tornillos-table-header.db';
import { TornillosTableHeaderService } from './services/tornillos-table-header.service';
import { iTornillos } from './interfaces/iTornillos';
import { TornillosService } from './services/tornillos.service';
import { LoginService } from './services/login/login.service';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CompleteLayoutComponent, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
    { provide: LOCALE_ID, useValue: 'es' },
  ],
})
export class AppComponent {
  title = 'prueba_tecnica_mercadona';

  constructor(
    private loginSE: LoginService,
    private tornillosTableHeaderSE: TornillosTableHeaderService,
    private tornillosSE: TornillosService
  ) {}

  ngOnInit() {
    this.manageLogin();
    this.manageColumns();
    this.manageTornillos();
  }

  // Login management

  manageLogin() {
    // We check if the user is logged in
    const loginInformation: iLoginInformation = this.checkLoginInformation();

    // We handle the login status
    this.loginSE.handleLogin(loginInformation);
  }

  private checkLoginInformation() {
    // We check if the user has a token and username in the local storage
    const token: string | null = localStorage.getItem('mercadona_token');
    const username: string | null = localStorage.getItem('mercadona_username');
    const hasToken: boolean = token && token === 'tenemos_token' ? true : false;
    const hasTokenAndUsername = hasToken && username ? true : false;

    // We create an object with the login information
    const loginInformation: iLoginInformation = {
      hasToken,
      username: username || '',
      hasTokenAndUsername,
    };

    // We return the login information
    return loginInformation;
  }

  // Columns management

  manageColumns() {
    const columns: string | null = localStorage.getItem('tornillos_columns');
    if (columns) {
      const parsedColumns: iTableHeaderAndVariable[] = JSON.parse(columns);
      console.log(parsedColumns);
      this.tornillosTableHeaderSE.setTornillosTableHeader(parsedColumns);
    } else {
      const columns = this.tornillosTableHeaderSE.getTornillosTableHeader();
      localStorage.setItem('tornillos_columns', JSON.stringify(columns));
    }
  }

  // Tornillos management

  manageTornillos() {
    const tornillos: string | null = localStorage.getItem('tornillos');
    if (tornillos) {
      const parsedTornillos: iTornillos[] = JSON.parse(tornillos);
      this.tornillosSE.setTornillos(parsedTornillos);
    } else {
      const tornillos = this.tornillosSE.getTornillos();
      localStorage.setItem('tornillos', JSON.stringify(tornillos));
    }
  }
}
