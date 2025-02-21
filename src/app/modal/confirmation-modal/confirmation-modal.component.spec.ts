import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationModalComponent } from './confirmation-modal.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ButtonComponent } from '../../components/button/button.component';
import { iConfirmationModalContent } from '../../interfaces/iConfirmationModalContent';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmationModalComponent>>;

  beforeEach(async () => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['close']);
    const dialogData: iConfirmationModalContent = {
      action: 'Eliminar',
      content: '¿Desea eliminar el elemento seleccionado?',
    };

    await TestBed.configureTestingModule({
      imports: [ConfirmationModalComponent, MatDialogModule, ButtonComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpyObj },
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<ConfirmationModalComponent>
    >;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct content', () => {
    const content = fixture.nativeElement.querySelector('.title');
    expect(content.textContent).toBe(
      '¿Desea eliminar el elemento seleccionado?'
    );
  });

  it('should call dialogRef.close with false when cancelButtonOptions.onClick is called', () => {
    component.cancelButtonOptions.onClick();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });

  it('should call dialogRef.close with true when deleteButtonOptions.onClick is called', () => {
    component.deleteButtonOptions.onClick();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should set the delete button text to the action from the dialog data', () => {
    expect(component.deleteButtonOptions.text).toBe('Eliminar');
  });
});
