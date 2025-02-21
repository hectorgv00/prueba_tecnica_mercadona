import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TornillosService } from '../../services/tornillos.service';
import { LoginModalService } from '../../services/loginModal.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Subject } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let tornillosServiceSpy: jasmine.SpyObj<TornillosService>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let loginModalServiceSpy: jasmine.SpyObj<LoginModalService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const tornillosServiceSpyObj = jasmine.createSpyObj('TornillosService', [
      'getTornillosCount',
    ]);
    const loginServiceSpyObj = jasmine.createSpyObj('LoginService', [
      'isUserLogged',
    ]);
    const loginModalServiceSpyObj = jasmine.createSpyObj('LoginModalService', [
      'openDialog',
    ]);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: TornillosService, useValue: tornillosServiceSpyObj },
        { provide: LoginService, useValue: loginServiceSpyObj },
        { provide: LoginModalService, useValue: loginModalServiceSpyObj },
        { provide: Router, useValue: routerSpyObj },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    tornillosServiceSpy = TestBed.inject(
      TornillosService
    ) as jasmine.SpyObj<TornillosService>;
    loginServiceSpy = TestBed.inject(
      LoginService
    ) as jasmine.SpyObj<LoginService>;
    loginModalServiceSpy = TestBed.inject(
      LoginModalService
    ) as jasmine.SpyObj<LoginModalService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get tornillos count on init', () => {
    component.ngOnInit();
    expect(component.extraClass.tornilloCount).toBeGreaterThan(0);
  });

  it('should navigate to tornillos page if user is logged in', () => {
    loginServiceSpy.isUserLogged.and.returnValue(true);
    spyOn(component, 'goToTornillosPage');
    component.onReviewClick();
    expect(component.goToTornillosPage).toHaveBeenCalled();
    expect(loginModalServiceSpy.openDialog).not.toHaveBeenCalled();
  });

  it('should open login dialog if user is not logged in', () => {
    loginServiceSpy.isUserLogged.and.returnValue(false);
    spyOn(component, 'handleLogin');
    component.onReviewClick();
    expect(component.handleLogin).toHaveBeenCalled();
  });
});
