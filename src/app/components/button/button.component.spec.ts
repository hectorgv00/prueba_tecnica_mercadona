import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;

    component.buttonOptions = {
      text: 'Click me',
      onClick: () => {},
      class: 'primary',
      disabled: false,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the button', () => {
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement).toBeTruthy();
  });

  it('should call onClick when button is clicked', () => {
    spyOn(component.buttonOptions, 'onClick');
    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.triggerEventHandler('click', null);
    expect(component.buttonOptions.onClick).toHaveBeenCalled();
  });

  it('should have the correct class', () => {
    component.buttonOptions.class = 'primary';
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.classList).toContain('primary');
  });

  it('should be disabled when disabled is true', () => {
    component.buttonOptions.disabled = true;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.disabled).toBeTrue();
  });
});
