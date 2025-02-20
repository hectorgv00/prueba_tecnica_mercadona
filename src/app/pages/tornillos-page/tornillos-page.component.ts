import { Component } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from '../../components/table/table.component';
import { iTornillos } from '../../interfaces/iTornillos';
import { TornillosDB } from '../../db/tornillos.db';
import { iTableHeaderAndVariable } from '../../interfaces/iTableHeaderAndVariable';
import { ButtonComponent } from '../../components/button/button.component';
import { iButtonOptions } from '../../interfaces/iButtonOptions';

@Component({
  selector: 'app-tornillos-page',
  imports: [LoaderComponent, MatIconModule, TableComponent, ButtonComponent],
  templateUrl: './tornillos-page.component.html',
  styleUrl: './tornillos-page.component.scss',
})
export class TornillosPageComponent {
  isDataLoaded: boolean = false;

  dataSource: iTornillos[] = [];

  displayedColumns: iTableHeaderAndVariable[] = [
    { header: 'Nombre', variable: 'nombre' },
    { header: 'Precio', variable: 'precio' },
    { header: 'Formato', variable: 'formato' },
    { header: 'Marca', variable: 'marca' },
  ];

  addProductButtonOptions: iButtonOptions = {
    class: 'primary',
    disabled: false,
    onClick: () => {
      console.log('Add product button clicked');
    },
    text: 'Añadir producto',
  };

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isDataLoaded = true;
      this.dataSource = TornillosDB.getTornillos();
    }, 1000);
  }
}
