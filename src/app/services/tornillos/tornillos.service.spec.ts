import { TestBed } from '@angular/core/testing';
import { TornillosService } from './tornillos.service';
import { TornillosDB } from '../../db/tornillos.db';
import { iTornillos } from '../../interfaces/iTornillos';

describe('TornillosService', () => {
  let service: TornillosService;

  const mockTornillos: iTornillos[] = [
    { id: 1, nombre: 'Tornillo A', precio: 10, formato: 'M4', marca: 'Marca1' },
    { id: 2, nombre: 'Tornillo B', precio: 15, formato: 'M6', marca: 'Marca2' },
    { id: 3, nombre: 'Tornillo C', precio: 12, formato: 'M4', marca: 'Marca1' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TornillosService],
    });
    service = TestBed.inject(TornillosService);

    spyOn(TornillosDB, 'getTornillos').and.returnValue([...mockTornillos]);
    spyOn(TornillosDB, 'setTornillos').and.callFake(() => {});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all tornillos', () => {
    const tornillos = service.getTornillos();
    expect(tornillos.length).toBe(3);
    expect(tornillos).toEqual(mockTornillos);
  });

  it('should get paginated tornillos', () => {
    const pageSize = 2;
    const page1 = service.getTornillosPaginated(0, pageSize);
    expect(page1.length).toBe(2);
    expect(page1).toEqual(mockTornillos.slice(0, 2));

    const page2 = service.getTornillosPaginated(1, pageSize);
    expect(page2.length).toBe(1);
    expect(page2).toEqual(mockTornillos.slice(2, 3));
  });

  it('should get a tornillo by id', () => {
    const tornillo = service.getTornillo(1);
    expect(tornillo).toEqual(mockTornillos[0]);
  });

  it('should return null if tornillo does not exist', () => {
    const tornillo = service.getTornillo(99);
    expect(tornillo).toBeNull();
  });

  it('should get the correct count of tornillos', () => {
    const count = service.getTornillosCount();
    expect(count).toBe(3);
  });

  it('should add a new tornillo', () => {
    const newTornillo: iTornillos = {
      id: 4,
      nombre: 'Tornillo D',
      precio: 20,
      formato: 'M8',
      marca: 'Marca3',
    };

    spyOn(service, 'setTornillos');

    service.addTornillo(newTornillo);

    expect(service.setTornillos).toHaveBeenCalled();
  });

  it('should get unique formatos', () => {
    const formatos = service.getFormatosUnique();
    expect(formatos).toEqual(['M4', 'M6']);
  });

  it('should delete a tornillo by id', () => {
    spyOn(service, 'setTornillos');

    service.deleteTornillo(1);
    expect(service.setTornillos).toHaveBeenCalled();
  });
});
