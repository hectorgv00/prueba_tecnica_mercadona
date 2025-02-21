import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginModalComponent } from './login-modal.component';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModalExtraClass } from './login-modal-extra-class';
import { By } from '@angular/platform-browser';

describe('LoginModalComponent', () => {
  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<LoginModalComponent>>;

  beforeEach(async () => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        LoginModalComponent,
        MatDialogModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRefSpyObj },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginModalComponent);
    component = fixture.componentInstance;
    component.extraClass = new LoginModalExtraClass(
      component.submitForm.bind(component),
      component.onCancelButtonClick.bind(component)
    );
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<LoginModalComponent>
    >;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if the form is not completed, the button should be disabled', () => {
    fixture.detectChanges();
    const disabledOpion = component.extraClass.submitButtonOptions.disabled;
    expect(disabledOpion).toBeTrue();
  });

  it('if the form is completed, the button should be enabled', () => {
    component.extraClass.loginForm.setValue({
      username: 'mercadona',
    });
    fixture.detectChanges();
    const disabledOpion = component.extraClass.submitButtonOptions.disabled;
    expect(disabledOpion).toBeFalse();
  });

  it('should close the dialog when the cancel button is clicked', () => {
    component.extraClass.cancelButtonOptions.onClick();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });

  it('should send the form value on submit', () => {
    component.extraClass.loginForm.setValue({
      username: 'mercadona',
    });
    component.extraClass.submitButtonOptions.onClick();
    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      username: 'mercadona',
    });
  });

  it('should not let the user submit the form if the form is not completed', () => {
    const buttonElement = fixture.debugElement.query(
      By.css('app-button button')
    );
    spyOn(component.extraClass, 'submitForm');
    buttonElement.triggerEventHandler('click', null);
    expect(component.extraClass.submitForm).not.toHaveBeenCalled();
  });
});
