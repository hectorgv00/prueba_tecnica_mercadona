import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuffleColumnsModalComponent } from './shuffle-columns-modal.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { iTableHeaderAndVariable } from '../../interfaces/iTableHeaderAndVariable';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../components/button/button.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('ShuffleColumnsModalComponent', () => {
  let component: ShuffleColumnsModalComponent;
  let fixture: ComponentFixture<ShuffleColumnsModalComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ShuffleColumnsModalComponent>>;

  beforeEach(async () => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['close']);
    const dialogData: { columns: iTableHeaderAndVariable[] } = dialogColumns();

    await TestBed.configureTestingModule({
      imports: [
        ShuffleColumnsModalComponent,
        MatIconModule,
        MatDialogModule,
        ButtonComponent,
        DragDropModule,
        CommonModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpyObj },
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShuffleColumnsModalComponent);
    component = fixture.componentInstance;
    component.extraClass.sortedColumns = dialogColumns().columns;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<ShuffleColumnsModalComponent>
    >;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of columns', () => {
    const rows = fixture.debugElement.queryAll(By.css('.row'));
    expect(rows.length).toBe(dialogColumns().columns.length);
  });

  it('should call closePopup when cancel button is clicked', () => {
    spyOn(component.extraClass.cancelButtonOptions, 'onClick');
    const cancelButton = fixture.debugElement.query(
      By.css('app-button button.no-background')
    );
    cancelButton.triggerEventHandler('click', null);
    expect(component.extraClass.cancelButtonOptions.onClick).toHaveBeenCalled();
  });

  it('should call submitSortedColumns when apply button is clicked', () => {
    spyOn(component.extraClass.applyButtonOptions, 'onClick');
    const applyButton = fixture.debugElement.query(
      By.css('app-button button.primary')
    );
    applyButton.triggerEventHandler('click', null);
    expect(component.extraClass.applyButtonOptions.onClick).toHaveBeenCalled();
  });

  it('should call swapProperty when visibility icon is clicked', () => {
    spyOn(component, 'swapProperty');
    const visibilityIcon = fixture.debugElement.query(By.css('span.see'));
    visibilityIcon.triggerEventHandler('click', null);
    expect(component.swapProperty).toHaveBeenCalled();
  });

  it('should call swapProperty when pin icon is clicked', () => {
    spyOn(component, 'swapProperty');
    const pinIcon = fixture.debugElement.query(By.css('span.keep'));
    pinIcon.triggerEventHandler('click', null);
    expect(component.swapProperty).toHaveBeenCalled();
  });

  it('should set pinned to true when pin icon is clicked', () => {
    const pinIcon = fixture.debugElement.queryAll(By.css('span.keep'))[0];
    pinIcon.triggerEventHandler('click', null);
    expect(component.extraClass.sortedColumns[0].pinned).toBeTrue();
  });

  it('should set visible to true when visibility icon is clicked', () => {
    const visibilityIcon = fixture.debugElement.queryAll(By.css('span.see'))[0];
    visibilityIcon.triggerEventHandler('click', null);
    expect(component.extraClass.sortedColumns[0].visible).toBeFalse();
  });

  it('should update sortedColumns when onDrop is called', () => {
    const firstElement = component.extraClass.sortedColumns[0];
    const secondElement = component.extraClass.sortedColumns[1];

    const event = {
      previousIndex: 0,
      currentIndex: 1,
    };
    component.onDrop(event as any);
    expect(component.extraClass.sortedColumns[0]).toBe(secondElement);
    expect(component.extraClass.sortedColumns[1]).toBe(firstElement);
  });

  it('should not update sortedColumns when onDrop is called, but the second element is pinned', () => {
    const firstElement = component.extraClass.sortedColumns[0];
    const secondElement = component.extraClass.sortedColumns[1];
    secondElement.pinned = true;

    fixture.detectChanges();

    const event = {
      previousIndex: 0,
      currentIndex: 1,
    };
    component.onDrop(event as any);
    expect(component.extraClass.sortedColumns[0]).toBe(firstElement);
    expect(component.extraClass.sortedColumns[1]).toBe(secondElement);
  });

  it('should update sortedColumns when onDrop is called, managing if an element is pinned', () => {
    const firstElement = component.extraClass.sortedColumns[0];
    const secondElement = component.extraClass.sortedColumns[1];
    const thirdElement = component.extraClass.sortedColumns[2];
    secondElement.pinned = true;

    fixture.detectChanges();

    const event = {
      previousIndex: 0,
      currentIndex: 2,
    };
    component.onDrop(event as any);
    expect(component.extraClass.sortedColumns[0]).toEqual(thirdElement);
    expect(component.extraClass.sortedColumns[1]).toBe(secondElement);
    expect(component.extraClass.sortedColumns[2]).toEqual(firstElement);
  });
});

const dialogColumns = (): { columns: iTableHeaderAndVariable[] } => {
  return {
    columns: [
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
      {
        header: 'Actions',
        variable: 'actions',
        visible: true,
        pinned: false,
        index: 4,
      },
    ],
  };
};
