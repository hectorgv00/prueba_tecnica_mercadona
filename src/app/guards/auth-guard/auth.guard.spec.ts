import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { authGuard } from './auth.guard';
import { LoginService } from '../../services/login/login.service';

describe('authGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      // imports: [Router, LoginService],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if user is logged', () => {
    const loginService = TestBed.inject(LoginService);
    spyOn(loginService, 'isUserLogged').and.returnValue(true);

    const mockActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const mockRouterStateSnapshot = {} as RouterStateSnapshot;
    const result = executeGuard(
      mockActivatedRouteSnapshot,
      mockRouterStateSnapshot
    );

    expect(result).toBeTrue();
  });

  it('should return false and navigate to home if user is not logged', () => {
    const loginService = TestBed.inject(LoginService);
    const router = TestBed.inject(Router);
    spyOn(loginService, 'isUserLogged').and.returnValue(false);
    spyOn(router, 'navigate');

    const mockActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const mockRouterStateSnapshot = {} as RouterStateSnapshot;

    const result = executeGuard(
      mockActivatedRouteSnapshot,
      mockRouterStateSnapshot
    );

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
