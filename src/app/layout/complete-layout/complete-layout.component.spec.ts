import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteLayoutComponent } from './complete-layout.component';
import { NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { CompleteLayoutExtraClass } from './complete-layout-extra-class';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('CompleteLayoutComponent', () => {
  let component: CompleteLayoutComponent;
  let fixture: ComponentFixture<CompleteLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteLayoutComponent, NgOptimizedImage, ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompleteLayoutComponent);
    component = fixture.componentInstance;

    const openLoginDialog = () => {};
    const logout = () => {};

    const extraClass: CompleteLayoutExtraClass = new CompleteLayoutExtraClass(
      openLoginDialog,
      logout
    );
    component.extraClass = extraClass;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display image', () => {
    const image = fixture.debugElement.query(By.css('img'));
    expect(image).toBeTruthy();
  });

  it('image should be the mercadona logo', () => {
    const image = fixture.debugElement.query(By.css('img'));
    expect(image.nativeElement.src).toContain('images/logoMercadona.webp');
  });

  it('should navigate to home on logo and text clicked', () => {
    const router = TestBed.inject(Router);

    const logoAndText = fixture.debugElement.query(By.css('.logo-and-text'));
    spyOn(component, 'goToHome').and.callThrough();
    spyOn(router, 'navigate');

    logoAndText.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(component.goToHome).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should display the login button when not logged in', () => {
    component.extraClass.isLogged = false;

    fixture.detectChanges();

    const loginButton = fixture.debugElement.query(By.css('app-button'));

    expect(loginButton).toBeTruthy();
    expect(loginButton.componentInstance.buttonOptions.text).toBe(
      'Iniciar sesión'
    );
  });

  it('should display the logout button when logged in', () => {
    component.extraClass.isLogged = true;

    fixture.detectChanges();

    const logoutButton = fixture.debugElement.query(By.css('app-button'));

    expect(logoutButton).toBeTruthy();
    expect(logoutButton.componentInstance.buttonOptions.icon).toBe('logout');
  });

  it('should call openDialog when the login button is clicked', () => {
    component.extraClass.isLogged = false;
    fixture.detectChanges();
    spyOn(component.extraClass, 'openLoginDialog');
    const loginButton = fixture.debugElement.query(By.css('app-button button'));
    expect(loginButton).toBeTruthy();
    loginButton.triggerEventHandler('click', null);
    expect(component.extraClass.openLoginDialog).toHaveBeenCalled();
  });

  it('should call logout when the login button is clicked', () => {
    component.extraClass.isLogged = true;
    fixture.detectChanges();
    spyOn(component.extraClass, 'logout');
    const loginButton = fixture.debugElement.query(By.css('app-button button'));
    expect(loginButton).toBeTruthy();
    loginButton.triggerEventHandler('click', null);
    expect(component.extraClass.logout).toHaveBeenCalled();
  });
});
