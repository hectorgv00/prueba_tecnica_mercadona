import { Component, Input } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { iTableHeaderAndVariable } from '../../interfaces/iTableHeaderAndVariable';
import { MatIconModule } from '@angular/material/icon';
import { iPaginatorOptions } from '../../interfaces/iPaginatorOptions';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatPaginatorModule, MatIconModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  private _columns: iTableHeaderAndVariable[] = [];

  @Input({ required: true })
  dataSource: any[] = [];

  @Input({ required: true })
  get displayedColumns(): iTableHeaderAndVariable[] {
    return this._columns;
  }

  set displayedColumns(columns: iTableHeaderAndVariable[]) {
    this._columns = columns;
    this.displayedColumnIds = columns.map((c) => c.variable);
    this.displayedColumnIds.push('actions');
  }

  @Input({ required: true })
  paginatorOptions!: iPaginatorOptions;

  displayedColumnIds: string[] = [];
}
