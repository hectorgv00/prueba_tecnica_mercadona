import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

/***
 * authGuard
 * @param route
 * @param state
 * @returns {boolean}
 * This function is used to check if the user is logged in.
 */
export const authGuard: CanActivateFn = (route, state) => {
  // We inject the router and the login service
  const router = inject(Router);
  const loginSE = inject(LoginService);

  // We check if the user is logged in
  const isUserLogged = loginSE.isUserLogged();

  // If the user is logged in, we return true, so the user can access the page
  if (isUserLogged) {
    return true;
  }

  // Otherwise, we redirect the user to the login page
  router.navigate(['/']);
  return false;
};
