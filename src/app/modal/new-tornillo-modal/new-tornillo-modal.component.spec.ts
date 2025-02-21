import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTornilloModalComponent } from './new-tornillo-modal.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { TornillosService } from '../../services/tornillos/tornillos.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '../../components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('NewTornilloModalComponent', () => {
  let component: NewTornilloModalComponent;
  let fixture: ComponentFixture<NewTornilloModalComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<NewTornilloModalComponent>>;
  let tornillosServiceSpy: jasmine.SpyObj<TornillosService>;

  beforeEach(async () => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['close']);
    const tornillosServiceSpyObj = jasmine.createSpyObj('TornillosService', [
      'getFormatosUnique',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        NewTornilloModalComponent,
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        ButtonComponent,
        MatIconModule,
        MatSelectModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpyObj },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: TornillosService, useValue: tornillosServiceSpyObj },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTornilloModalComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<NewTornilloModalComponent>
    >;
    tornillosServiceSpy = TestBed.inject(
      TornillosService
    ) as jasmine.SpyObj<TornillosService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(
      component.extraClass.newTornilloForm.controls['nombre']
    ).toBeTruthy();
    expect(
      component.extraClass.newTornilloForm.controls['precio']
    ).toBeTruthy();
    expect(
      component.extraClass.newTornilloForm.controls['formato']
    ).toBeTruthy();
    expect(component.extraClass.newTornilloForm.controls['marca']).toBeTruthy();
  });

  it('should render the form correctly', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    expect(inputs.length).toBe(3);
    const selects = fixture.debugElement.queryAll(By.css('mat-select'));
    expect(selects.length).toBe(1);
  });

  it('if the form is not completed, the button should be disabled', () => {
    fixture.detectChanges();
    const disabledOpion = component.extraClass.saveButtonOptions.disabled;
    expect(disabledOpion).toBeTrue();
  });

  it('if the form is completed, the button should be enabled', () => {
    component.extraClass.newTornilloForm.setValue({
      nombre: 'tornillo',
      precio: 1,
      formato: 'formato',
      marca: 'marca',
    });
    fixture.detectChanges();
    const disabledOpion = component.extraClass.saveButtonOptions.disabled;
    expect(disabledOpion).toBeFalse();
  });

  it('should close the dialog when the cancel button is clicked', () => {
    component.extraClass.cancelButtonOptions.onClick();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });

  it('should send the form value on submit', () => {
    component.extraClass.newTornilloForm.setValue({
      nombre: 'tornillo',
      precio: 1,
      formato: 'formato',
      marca: 'marca',
    });
    component.extraClass.saveButtonOptions.onClick();
    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      nombre: 'tornillo',
      precio: 1,
      formato: 'formato',
      marca: 'marca',
    });
  });

  it('should not let the user submit the form if the form is not completed', () => {
    const buttonElement = fixture.debugElement.query(
      By.css('app-button button')
    );
    spyOn(component.extraClass, 'saveForm');
    buttonElement.triggerEventHandler('click', null);
    expect(component.extraClass.saveForm).not.toHaveBeenCalled();
  });

  it('should call addPrice when add button is clicked', () => {
    spyOn(component, 'addPrice');
    const addButton = fixture.debugElement.queryAll(
      By.css('.sum-or-minus-button')
    )[1];
    addButton.triggerEventHandler('click', null);
    expect(component.addPrice).toHaveBeenCalled();
  });

  it('should add 1 to price when addPrice is called', () => {
    component.extraClass.newTornilloForm.setValue({
      ...component.extraClass.newTornilloForm.value,
      precio: 1,
    });
    component.addPrice();
    expect(component.extraClass.newTornilloForm.value.precio).toBe(1.1);
  });

  it('should call removePrice when remove button is clicked', () => {
    spyOn(component, 'removePrice');
    const removeButton = fixture.debugElement.queryAll(
      By.css('.sum-or-minus-button')
    )[0];
    removeButton.triggerEventHandler('click', null);
    expect(component.removePrice).toHaveBeenCalled();
  });

  it('should remove 1 to price when removePrice is called', () => {
    component.extraClass.newTornilloForm.setValue({
      ...component.extraClass.newTornilloForm.value,
      precio: 1,
    });
    component.removePrice();
    expect(component.extraClass.newTornilloForm.value.precio).toBe(0.9);
  });

  it('should set formats from tornillosService on init', () => {
    const formats = ['digital', 'fisico'];
    tornillosServiceSpy.getFormatosUnique.and.returnValue(formats);
    component.ngOnInit();
    expect(component.extraClass.formats).toEqual(formats);
  });
});
