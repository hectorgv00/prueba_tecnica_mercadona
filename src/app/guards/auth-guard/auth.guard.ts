import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginSE = inject(LoginService);

  const isUserLogged = loginSE.isUserLogged();
  console.log(isUserLogged);

  if (isUserLogged) {
    return true;
  }
  router.navigate(['/']);
  return false;
};
