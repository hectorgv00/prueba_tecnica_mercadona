import { Injectable } from '@angular/core';
import { TornillosTableHeaderDB } from '../../db/tornillos-table-header.db';
import { iTableHeaderAndVariable } from '../../interfaces/iTableHeaderAndVariable';

@Injectable({
  providedIn: 'root',
})
export class TornillosTableHeaderService {
  constructor(private tornillosTableHeaderDB: TornillosTableHeaderDB) {}

  getTornillosTableHeader() {
    return this.tornillosTableHeaderDB.getTornillosTableHeader();
  }

  setTornillosTableHeader(tornillosTableHeader: iTableHeaderAndVariable[]) {
    localStorage.setItem(
      'tornillos_columns',
      JSON.stringify(tornillosTableHeader)
    );
    this.tornillosTableHeaderDB.setTornillosTableHeader(tornillosTableHeader);
  }
}
