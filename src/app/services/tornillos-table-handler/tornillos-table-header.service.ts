import { Injectable } from '@angular/core';
import { TornillosTableHeaderDB } from '../../db/tornillos-table-header.db';
import { iTableHeaderAndVariable } from '../../interfaces/iTableHeaderAndVariable';

@Injectable({
  providedIn: 'root',
})
export class TornillosTableHeaderService {
  /**
   * Constructor
   * @param {TornillosTableHeaderDB} tornillosTableHeaderDB
   * This constructor is used to inject the tornillosTableHeaderDB service.
   */
  constructor(private tornillosTableHeaderDB: TornillosTableHeaderDB) {}

  /**
   * getTornillosTableHeader
   * @returns {iTableHeaderAndVariable[]}
   * This method is used to get the table header of the tornillos table.
   */
  getTornillosTableHeader() {
    return this.tornillosTableHeaderDB.getTornillosTableHeader();
  }

  /**
   * setTornillosTableHeader
   * @param {iTableHeaderAndVariable[]} tornillosTableHeader
   * This method is used to set the table header of the tornillos table and save it in the local storage.
   */
  setTornillosTableHeader(tornillosTableHeader: iTableHeaderAndVariable[]) {
    // We save the table header in the local storage
    localStorage.setItem(
      'tornillos_columns',
      JSON.stringify(tornillosTableHeader)
    );

    // We set the table header in the "db"
    this.tornillosTableHeaderDB.setTornillosTableHeader(tornillosTableHeader);
  }
}
