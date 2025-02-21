import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from './login.service';
import { iLoginInformation } from '../../interfaces/iLoginInformation';

describe('LoginService', () => {
  let service: LoginService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [LoginService, { provide: Router, useValue: routerSpyObj }],
    });

    service = TestBed.inject(LoginService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return login information as observable', (done: DoneFn) => {
    service.loginInformation.subscribe((loginInfo) => {
      expect(loginInfo).toEqual({
        hasToken: false,
        username: '',
        hasTokenAndUsername: false,
      });
      done();
    });
  });

  it('should simulate login process', () => {
    const username = 'testuser';
    service['login'](username);
    expect(localStorage.getItem('mercadona_token')).toBe('tenemos_token');
    expect(localStorage.getItem('mercadona_username')).toBe(username);
    expect(service['_loginInformation'].getValue()).toEqual({
      hasToken: true,
      username,
      hasTokenAndUsername: true,
    });
  });

  it('should simulate logout process', () => {
    service.logout();
    expect(localStorage.getItem('mercadona_token')).toBeNull();
    expect(localStorage.getItem('mercadona_username')).toBeNull();
    expect(service['_loginInformation'].getValue()).toEqual({
      hasToken: false,
      username: '',
      hasTokenAndUsername: false,
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should handle login process', () => {
    const loginInformation: iLoginInformation = {
      hasToken: true,
      username: 'testuser',
      hasTokenAndUsername: true,
    };
    spyOn(service as any, 'login');
    spyOn(service, 'logout');
    service.handleLogin(loginInformation);
    expect(service['login']).toHaveBeenCalledWith(loginInformation.username);
    expect(service.logout).not.toHaveBeenCalled();

    loginInformation.hasTokenAndUsername = false;
    service.handleLogin(loginInformation);
    expect(service.logout).toHaveBeenCalled();
  });

  it('should check if user is logged in', () => {
    localStorage.setItem('mercadona_token', 'tenemos_token');
    localStorage.setItem('mercadona_username', 'testuser');
    expect(service.isUserLogged()).toBeTrue();
    expect(service['_loginInformation'].getValue()).toEqual({
      hasToken: true,
      username: 'testuser',
      hasTokenAndUsername: true,
    });

    service.logout();
    expect(service.isUserLogged()).toBeFalse();
  });
});
