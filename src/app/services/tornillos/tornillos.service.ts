import { Injectable } from '@angular/core';
import { TornillosDB } from '../../db/tornillos.db';
import { iTornillos } from '../../interfaces/iTornillos';
@Injectable({
  providedIn: 'root',
})
export class TornillosService {
  /**
   * getTornillos
   * @returns {iTornillos[]}
   * This method is used to get the list of tornillos from the "db"
   */
  getTornillos(): iTornillos[] {
    return TornillosDB.getTornillos();
  }

  /**
   * getTornillosPaginated
   * @param {number} page
   * @param {number} pageSize
   * @returns {iTornillos[]}
   * This method is used to get the list of tornillos paginated from the "db"
   */
  getTornillosPaginated(page: number, pageSize: number): iTornillos[] {
    // We get the list of tornillos
    const tornillos = TornillosDB.getTornillos();

    // We calculate the start and end of the page
    const start = page * pageSize;

    // We calculate the end of the page
    const end = start + pageSize;

    // We return the list of tornillos paginated
    return tornillos.slice(start, end);
  }

  /**
   * getTornillo
   * @param {number} id
   * @returns {iTornillos | null}
   * This method is used to get a tornillo by id from the "db"
   */
  getTornillo(id: number): iTornillos | null {
    return (
      TornillosDB.getTornillos().find((tornillo) => tornillo.id === id) || null
    );
  }

  /**
   * getTornillosCount
   * @returns {number}
   * This method is used to get the number of tornillos from the "db"
   */
  getTornillosCount(): number {
    return TornillosDB.getTornillos().length;
  }

  /**
   * addTornillo
   * @param {iTornillos} tornillo
   * This method is used to add a tornillo to the "db"
   */
  addTornillo(tornillo: iTornillos): void {
    // We set a uuid to the tornillo, so we can identify it
    const tornilloWithUUID = { ...tornillo, id: Date.now() };

    // We get the list of tornillos
    const tornillos = TornillosDB.getTornillos();

    // We insert the new tornillo at the beginning of the list
    tornillos.unshift(tornilloWithUUID);

    // We set the new list of tornillos
    this.setTornillos(tornillos);
  }

  /**
   * updateTornillo
   * @param {iTornillos} tornillo
   * This method is used to update the tornillos list in the "db"
   */
  setTornillos(tornillos: iTornillos[]): void {
    // We set the new list of tornillos
    TornillosDB.setTornillos(tornillos);

    // We set the new list of tornillos in the local storage
    localStorage.setItem('tornillos', JSON.stringify(tornillos));
  }

  /**
   * getMarcasUnique
   * @returns {string[]}
   * This method is used to get the unique list of marcas from the "db"
   */
  getFormatosUnique(): string[] {
    // We get the list of tornillos
    const tornillos: iTornillos[] = TornillosDB.getTornillos();

    // We get the unique list of formatos, using the Set to avoid duplicates
    const formatos: string[] = tornillos.map(
      (tornillo: iTornillos) => tornillo.formato
    );
    return [...new Set(formatos)];
  }

  /**
   * deleteTornillo
   * @param {number} id
   * This method is used to delete a tornillo from the "db"
   */
  deleteTornillo(id: number) {
    // We get the list of tornillos and we filter it to remove the tornillo with the id we want to delete
    const tornillos = TornillosDB.getTornillos().filter(
      (tornillo) => tornillo.id !== id
    );

    // We set the new list of tornillos
    this.setTornillos(tornillos);

    // We set the new list of tornillos in the local storage
    localStorage.setItem('tornillos', JSON.stringify(tornillos));
  }
}
