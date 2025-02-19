import { Component } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from '../../components/table/table.component';
import { iTornillos } from '../../interfaces/iTornillos';
import { TornillosDB } from '../../db/tornillos.db';
import { iTableHeaderAndVariable } from '../../interfaces/iTableHeaderAndVariable';

@Component({
  selector: 'app-tornillos-page',
  imports: [LoaderComponent, MatIconModule, TableComponent],
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

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isDataLoaded = true;
      this.dataSource = TornillosDB.getTornillos();
    }, 1000);
  }
}
