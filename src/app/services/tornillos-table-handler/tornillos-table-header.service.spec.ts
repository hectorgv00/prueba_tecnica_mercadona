import { TestBed } from '@angular/core/testing';
import { TornillosTableHeaderService } from './tornillos-table-header.service';
import { TornillosTableHeaderDB } from '../../db/tornillos-table-header.db';

describe('TornillosTableHeaderService', () => {
  let service: TornillosTableHeaderService;
  let tornillosTableHeaderDB: jasmine.SpyObj<TornillosTableHeaderDB>;
  beforeEach(() => {
    const tornillosTableHeaderDBSpy = jasmine.createSpyObj(
      'TornillosTableHeaderDB',
      ['getTornillosTableHeader', 'setTornillosTableHeader']
    );

    TestBed.configureTestingModule({
      providers: [
        TornillosTableHeaderService,
        {
          provide: TornillosTableHeaderDB,
          useValue: tornillosTableHeaderDBSpy,
        },
      ],
    });

    service = TestBed.inject(TornillosTableHeaderService);
    tornillosTableHeaderDB = TestBed.inject(
      TornillosTableHeaderDB
    ) as jasmine.SpyObj<TornillosTableHeaderDB>;
  });

  it('should be created', () => {
    const service = TestBed.inject(TornillosTableHeaderService);
    expect(service).toBeTruthy();
  });

  it('should get tornillos table header', () => {
    service.getTornillosTableHeader();
    expect(tornillosTableHeaderDB.getTornillosTableHeader).toHaveBeenCalled();
  });

  it('should set tornillos table header', () => {
    const header = [
      {
        header: 'Nombre',
        variable: 'nombre',
        visible: true,
        pinned: false,
        index: 0,
      },
    ];
    service.setTornillosTableHeader(header);
    expect(tornillosTableHeaderDB.setTornillosTableHeader).toHaveBeenCalledWith(
      header
    );
  });
});
