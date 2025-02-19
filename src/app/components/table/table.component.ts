import { Component, Input } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { iTableHeaderAndVariable } from '../../interfaces/iTableHeaderAndVariable';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatPaginatorModule, MatIconModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'], // Asegúrate de usar "styleUrls"
})
export class TableComponent {
  @Input({ required: true })
  dataSource: any[] = [];

  private _columns: iTableHeaderAndVariable[] = [];

  // Array de strings que se usarán en la definición de filas de la tabla.
  displayedColumnIds: string[] = [];

  @Input({ required: true })
  get displayedColumns(): iTableHeaderAndVariable[] {
    return this._columns;
  }
  set displayedColumns(columns: iTableHeaderAndVariable[]) {
    this._columns = columns;
    // Genera el array de identificadores (usando la propiedad 'variable')
    this.displayedColumnIds = columns.map((c) => c.variable);
    this.displayedColumnIds.push('actions');
  }
}
