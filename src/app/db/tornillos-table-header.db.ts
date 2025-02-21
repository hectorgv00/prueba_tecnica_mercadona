import { Injectable } from '@angular/core';
import { iTableHeaderAndVariable } from '../interfaces/iTableHeaderAndVariable';

@Injectable({
  providedIn: 'root',
})
export class TornillosTableHeaderDB {
  /**
   * tornillosTableHeaderDB
   * @private
   * @type {iTableHeaderAndVariable[]}
   * This variable is used to store the table header of the tornillos table as it was a database.
   */
  private tornillosTableHeaderDB: iTableHeaderAndVariable[] = [
    {
      header: 'Nombre',
      variable: 'nombre',
      index: 0,
      pinned: true,
      visible: true,
    },
    {
      header: 'Precio',
      variable: 'precio',
      index: 1,
      pinned: false,
      visible: true,
    },
    {
      header: 'Formato',
      variable: 'formato',
      index: 2,
      pinned: false,
      visible: true,
    },
    {
      header: 'Marca',
      variable: 'marca',
      index: 3,
      pinned: false,
      visible: true,
    },
  ];

  /**
   * getTornillosTableHeader
   * @returns {iTableHeaderAndVariable[]}
   * This method is used to get the table header of the tornillos table.
   */
  getTornillosTableHeader(): iTableHeaderAndVariable[] {
    return this.tornillosTableHeaderDB;
  }

  /**
   * setTornillosTableHeader
   * @param {iTableHeaderAndVariable[]} tornillosTableHeader
   * This method is used to set the table header of the tornillos table.
   */
  setTornillosTableHeader(tornillosTableHeader: iTableHeaderAndVariable[]) {
    this.tornillosTableHeaderDB = tornillosTableHeader;
  }
}
