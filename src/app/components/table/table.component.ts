import { Component, Input } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { iTableHeaderAndVariable } from '../../interfaces/iTableHeaderAndVariable';
import { MatIconModule } from '@angular/material/icon';
import { iPaginatorOptions } from '../../interfaces/iPaginatorOptions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  /****
   * Variable that stores the columns to be displayed. It gets the infromation from the input set displayedColumns, and it delivers the information to the input get displayedColumns.
   */
  private _columns: iTableHeaderAndVariable[] = [];

  /**
   * @Input dataSource: any[]
   * @type {any[]}
   * Input to receive the data to be displayed in the table. It has an any[], due to it being able to receive any kind of data.
   */

  @Input({ required: true })
  dataSource: any[] = [];

  /***
   * @Input displayedColumns: iTableHeaderAndVariable[]
   * @type {iTableHeaderAndVariable[]}
   * Input to receive the columns to be displayed in the table. It has an iTableHeaderAndVariable[], due to it being able to receive the information of the columns to be displayed.
   *
   * We are splitting the input in two, one for the getter and one for the setter, to implement actions once the information is set, avoiding having to use ngOnChanges.
   */
  @Input({ required: true })
  get displayedColumns(): iTableHeaderAndVariable[] {
    return this._columns;
  }

  /**
   * Setter for displayed columns.
   * This setter is used to set the columns to be displayed,
   * and it also sets the displayedColumnIds variable, which is used to display the columns in the table.
   * @param {iTableHeaderAndVariable[]} columns
   */
  set displayedColumns(columns: iTableHeaderAndVariable[]) {
    // We set the columns to the private variable _columns
    this._columns = columns;

    // We filter the columns to get only the visible ones
    const filteredColumns = columns.filter((c) => c.visible);

    // We take the variable of the filtered columns and we set it as the displayedColumnIds
    this.displayedColumnIds = [...filteredColumns.map((c) => c.variable)];

    // We add the actions column to the displayedColumnIds, as it does not come from the source.
    this.displayedColumnIds.push('actions');
  }

  /***
   * @Input paginatorOptions: iPaginatorOptions
   * @type {iPaginatorOptions}
   * Input to receive the options for the paginator.
   */
  @Input({ required: true })
  paginatorOptions!: iPaginatorOptions;

  /***
   * @Input deleteAction: (id: number) => void
   * @type {(id: number) => void}
   * Input to receive the action to be executed when the delete button is clicked.
   */
  @Input({ required: true })
  deleteAction!: (id: number) => void;

  /***
   * Array of the columns to be displayed in the table.
   */
  displayedColumnIds: string[] = [];
}
