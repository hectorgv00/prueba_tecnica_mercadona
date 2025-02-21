import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { iTableHeaderAndVariable } from '../../interfaces/iTableHeaderAndVariable';
import { By } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { iTornillos } from '../../interfaces/iTornillos';
import { iPaginatorOptions } from '../../interfaces/iPaginatorOptions';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TableComponent,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.dataSource = getDataSource();

    component.displayedColumns = getDisplayedColumns();

    component.deleteAction = jasmine.createSpy('deleteAction');

    component.paginatorOptions = getPaginationOptions();

    component.displayedColumnIds = getDisplayedCoumsId(component);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should display the columns', () => {
    expect(component.displayedColumnIds).toEqual([
      'nombre',
      'precio',
      'formato',
      'marca',
      'actions',
    ]);

    fixture.detectChanges();

    const headerCells = fixture.debugElement.queryAll(By.css('th'));
    expect(headerCells.length).toBe(5);
    expect(headerCells[0].nativeElement.textContent).toContain('Nombre');
    expect(headerCells[1].nativeElement.textContent).toContain('Precio');
    expect(headerCells[2].nativeElement.textContent).toContain('Formato');
    expect(headerCells[3].nativeElement.textContent).toContain('Marca');
    expect(headerCells[4].nativeElement.textContent).toContain('Acciones');
  });

  it('Should display the rows', () => {
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tr'));
    expect(rows.length).toBe(3);
  });

  it('Should display the paginator', () => {
    fixture.detectChanges();

    const paginator = fixture.debugElement.query(By.css('mat-paginator'));
    expect(paginator).toBeTruthy();
  });

  it('Should call the delete action', () => {
    fixture.detectChanges();

    const deleteButtons = fixture.debugElement.queryAll(By.css('.delete-icon'));
    expect(deleteButtons.length).toBeGreaterThan(0);
    deleteButtons[0].triggerEventHandler('click', null);

    expect(component.deleteAction).toHaveBeenCalled();
  });

  it('Should change the page', () => {
    fixture.detectChanges();

    const paginator = fixture.debugElement.query(By.css('mat-paginator'));
    paginator.triggerEventHandler('page', { pageIndex: 1 });

    expect(component.paginatorOptions.onPageChange).toHaveBeenCalled();
  });

  it('Should change the page size', () => {
    fixture.detectChanges();

    const paginator = fixture.debugElement.query(By.css('mat-paginator'));
    paginator.triggerEventHandler('page', { pageIndex: 1 });

    expect(component.paginatorOptions.onPageChange).toHaveBeenCalled();
  });

  it('Should display the first and last buttons', () => {
    fixture.detectChanges();

    const paginator = fixture.debugElement.query(By.css('mat-paginator'));
    expect(paginator.componentInstance.showFirstLastButtons).toBe(true);
  });

  it('Should disable the paginator', () => {
    component.paginatorOptions.disabled = true;
    fixture.detectChanges();

    const paginator = fixture.debugElement.query(By.css('mat-paginator'));
    expect(paginator.componentInstance.disabled).toBe(true);
  });
});

const getDataSource = (): iTornillos[] => {
  return [
    {
      nombre: 'Producto 1',
      precio: 100,
      id: 1,
      formato: 'digital',
      marca: 'marca 1',
    },
    {
      nombre: 'Producto 2',
      precio: 200,
      id: 2,
      formato: 'fisico',
      marca: 'marca 2',
    },
  ];
};

const getDisplayedColumns = (): iTableHeaderAndVariable[] => {
  return [
    {
      header: 'Nombre',
      variable: 'nombre',
      visible: true,
      pinned: false,
      index: 0,
    },
    {
      header: 'Precio',
      variable: 'precio',
      visible: true,
      pinned: false,
      index: 1,
    },
    {
      header: 'Formato',
      variable: 'formato',
      visible: true,
      pinned: false,
      index: 2,
    },
    {
      header: 'Marca',
      variable: 'marca',
      visible: true,
      pinned: false,
      index: 3,
    },
  ];
};

const getPaginationOptions = (): iPaginatorOptions => {
  return {
    pageSize: 5,
    pageSizeOptions: [5, 10, 20, 50],
    disabled: false,
    length: 200,
    onPageChange: jasmine.createSpy('onPageChange'),
    pageIndex: 0,
    showFirstLastButtons: true,
  };
};

const getDisplayedCoumsId = (component: TableComponent): string[] => {
  let displayedColumnsId = getDisplayedColumns()
    .filter((column) => column.visible)
    .map((column) => column.variable);
  displayedColumnsId.push('actions');
  console.log(component.displayedColumnIds);
  return displayedColumnsId;
};
