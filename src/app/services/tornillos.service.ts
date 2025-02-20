import { Injectable } from '@angular/core';
import { TornillosDB } from '../db/tornillos.db';
import { iTornillos } from '../interfaces/iTornillos';
@Injectable({
  providedIn: 'root',
})
export class TornillosService {
  // We get all the tornillos from the "db"
  getTornillos(): iTornillos[] {
    return TornillosDB.getTornillos();
  }

  // We get a paginated list of tornillos
  getTornillosPaginated(page: number, pageSize: number): iTornillos[] {
    const tornillos = TornillosDB.getTornillos();
    const start = page * pageSize;
    const end = start + pageSize;
    return tornillos.slice(start, end);
  }

  // We get a single tornillo byu its id
  getTornillo(id: number): iTornillos | null {
    return (
      TornillosDB.getTornillos().find((tornillo) => tornillo.id === id) || null
    );
  }

  // We get the number of tornillos
  getTornillosCount(): number {
    return TornillosDB.getTornillos().length;
  }

  // we add a new tornillo to the "db"
  addTornillo(tornillo: iTornillos): void {
    TornillosDB.getTornillos().unshift(tornillo);
  }
}
