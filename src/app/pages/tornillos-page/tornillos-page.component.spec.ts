import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { TornillosPageComponent } from './tornillos-page.component';
import { TornillosService } from '../../services/tornillos/tornillos.service';
import { MatDialog } from '@angular/material/dialog';
import { TornillosTableHeaderService } from '../../services/tornillos-table-handler/tornillos-table-header.service';
import { confirmationModalService } from '../../services/confirmation-modal/confirmation-modal.service';
import { of, Subject } from 'rxjs';

describe('TornillosPageComponent', () => {
  let component: TornillosPageComponent;
  let fixture: ComponentFixture<TornillosPageComponent>;
  let tornillosServiceSpy: jasmine.SpyObj<TornillosService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let tornillosTableHeaderServiceSpy: jasmine.SpyObj<TornillosTableHeaderService>;
  let confirmationModalServiceSpy: jasmine.SpyObj<confirmationModalService>;

  beforeEach(async () => {
    const tornillosServiceSpyObj = jasmine.createSpyObj('TornillosService', [
      'getTornillosPaginated',
      'getTornillosCount',
      'addTornillo',
      'deleteTornillo',
    ]);
    const dialogSpyObj = jasmine.createSpyObj('MatDialog', ['open']);
    const tornillosTableHeaderServiceSpyObj = jasmine.createSpyObj(
      'TornillosTableHeaderService',
      ['getTornillosTableHeader', 'setTornillosTableHeader']
    );
    const confirmationModalServiceSpyObj = jasmine.createSpyObj(
      'confirmationModalService',
      ['openDialog']
    );

    await TestBed.configureTestingModule({
      imports: [TornillosPageComponent],
      providers: [
        { provide: TornillosService, useValue: tornillosServiceSpyObj },
        { provide: MatDialog, useValue: dialogSpyObj },
        {
          provide: TornillosTableHeaderService,
          useValue: tornillosTableHeaderServiceSpyObj,
        },
        {
          provide: confirmationModalService,
          useValue: confirmationModalServiceSpyObj,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TornillosPageComponent);
    component = fixture.componentInstance;
    tornillosServiceSpy = TestBed.inject(
      TornillosService
    ) as jasmine.SpyObj<TornillosService>;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    tornillosTableHeaderServiceSpy = TestBed.inject(
      TornillosTableHeaderService
    ) as jasmine.SpyObj<TornillosTableHeaderService>;
    confirmationModalServiceSpy = TestBed.inject(
      confirmationModalService
    ) as jasmine.SpyObj<confirmationModalService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tornillos on init', fakeAsync(() => {
    component.ngOnInit();
    tick(1001);
    expect(tornillosServiceSpy.getTornillosPaginated).toHaveBeenCalled();
    expect(tornillosServiceSpy.getTornillosCount).toHaveBeenCalled();
    expect(
      tornillosTableHeaderServiceSpy.getTornillosTableHeader
    ).toHaveBeenCalled();
  }));

  it('should open shuffle columns modal', () => {
    const shuffleColumnsModal = {
      afterClosed: () =>
        of([
          {
            header: 'Nombre',
            variable: 'nombre',
            visible: true,
            pinned: false,
            index: 0,
          },
        ]),
    };
    dialogSpy.open.and.returnValue(shuffleColumnsModal as any);
    component.openShuffleColumnsModal();
    expect(dialogSpy.open).toHaveBeenCalled();
    expect(component.extraClass.displayedColumns.length).toBe(1);
  });

  it('should open new tornillo modal', () => {
    const newTornilloModal = {
      afterClosed: () =>
        of({
          nombre: 'Test',
          precio: 10,
          formato: 'digital',
          marca: 'TestMarca',
        }),
    };
    dialogSpy.open.and.returnValue(newTornilloModal as any);
    component.openNewTornilloModal();
    expect(dialogSpy.open).toHaveBeenCalled();
    expect(tornillosServiceSpy.addTornillo).toHaveBeenCalled();
  });

  it('should handle pagination', () => {
    spyOn(component, 'getTornillosPaginated');
    const event = { pageIndex: 1, pageSize: 10 } as any;
    component.handlePagination(event);
    expect(component.extraClass.pageIndex).toBe(1);
    expect(component.extraClass.pageSize).toBe(10);
    expect(component.getTornillosPaginated).toHaveBeenCalled();
  });

  it('should unsubscribe from subscriptions on destroy', () => {
    component.extraClass.shuffleColumnsModalSubscription =
      new Subject().subscribe();
    component.extraClass.newTornilloModalSubscription =
      new Subject().subscribe();
    spyOn(component.extraClass.shuffleColumnsModalSubscription, 'unsubscribe');
    spyOn(component.extraClass.newTornilloModalSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(
      component.extraClass.shuffleColumnsModalSubscription.unsubscribe
    ).toHaveBeenCalled();
    expect(
      component.extraClass.newTornilloModalSubscription.unsubscribe
    ).toHaveBeenCalled();
  });
});
