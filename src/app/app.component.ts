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
import { TornillosTableHeaderService } from './services/tornillos-table-handler/tornillos-table-header.service';
import { iTornillos } from './interfaces/iTornillos';
import { TornillosService } from './services/tornillos/tornillos.service';
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
  /**
   * title
   * @type {string}
   * Title of the app
   */
  title = 'Prueba técnica Mercadona Héctor González Viejo';

  /**
   * Constructor
   * @param loginSE
   * @param tornillosTableHeaderSE
   * @param tornillosSE
   * This constructor is used to inject the services needed to handle the login, the columns and the tornillos
   */
  constructor(
    private loginSE: LoginService,
    private tornillosTableHeaderSE: TornillosTableHeaderService,
    private tornillosSE: TornillosService
  ) {}

  /**
   * ngOnInit
   * This function is used to initialize the component.
   */
  ngOnInit() {
    this.manageLogin();
    this.manageColumns();
    this.manageTornillos();
  }

  /**
   * manageLogin
   * This function is used to manage the login status of the user
   * It checks if the user is logged in and handles the login status
   */
  manageLogin() {
    // We check if the user is logged in
    const loginInformation: iLoginInformation = this.checkLoginInformation();

    // We send the information to the service to handle the login
    this.loginSE.handleLogin(loginInformation);
  }

  /**
   * checkLoginInformation
   * @private
   * @returns {iLoginInformation} loginInformation
   * This function is used to check the login information of the user
   * It checks if the user has a token and a username in the local storage
   *
   */
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

  /**
   * manageColumns
   * This function is used to manage the columns of the tornillos table
   */
  manageColumns() {
    // We get the columns from the local storage
    const columns: string | null = localStorage.getItem('tornillos_columns');

    // If the columns are in the local storage, we parse them and set
    if (columns) {
      const parsedColumns: iTableHeaderAndVariable[] = JSON.parse(columns);
      this.tornillosTableHeaderSE.setTornillosTableHeader(parsedColumns);

      // If the columns are not in the local storage, we get them from the service and set them
    } else {
      const columns = this.tornillosTableHeaderSE.getTornillosTableHeader();
      localStorage.setItem('tornillos_columns', JSON.stringify(columns));
    }
  }

  /**
   * manageTornillos
   * This function is used to manage the tornillos
   */
  manageTornillos() {
    // We get the tornillos from the local storage
    const tornillos: string | null = localStorage.getItem('tornillos');

    // If the tornillos are in the local storage, we parse them and set
    if (tornillos) {
      const parsedTornillos: iTornillos[] = JSON.parse(tornillos);
      this.tornillosSE.setTornillos(parsedTornillos);

      // If the tornillos are not in the local storage, we get them from the service and set them
    } else {
      const tornillos = this.tornillosSE.getTornillos();
      localStorage.setItem('tornillos', JSON.stringify(tornillos));
    }
  }
}
