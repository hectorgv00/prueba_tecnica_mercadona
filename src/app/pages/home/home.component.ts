import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { TornillosService } from '../../services/tornillos.service';
import { LoginService } from '../../services/login/login.service';
import { LoginModalService } from '../../services/login-modal/loginModal.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HomeExtraClass } from './home-extra-class';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [TornillosService, LoginModalService],
})
export class HomeComponent {
  extraClass: HomeExtraClass = new HomeExtraClass(
    this.onReviewClick.bind(this)
  );

  constructor(
    private tornillosSE: TornillosService,
    private loginSE: LoginService,
    private loginModalSE: LoginModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTornillosCount();
  }

  getTornillosCount(): void {
    this.extraClass.tornilloCount = this.tornillosSE.getTornillosCount();
  }

  onReviewClick(): void {
    const isUserLogged = this.checkIfUserIsLogged();
    if (isUserLogged) {
      this.goToTornillosPage();
    } else {
      this.handleLogin();
    }
  }

  checkIfUserIsLogged(): boolean {
    return this.loginSE.isUserLogged();
  }

  goToTornillosPage(): void {
    this.router.navigate(['/tornillos']);
  }

  handleLogin(): void {
    const subject = new Subject();
    this.loginModalSE.openDialog(subject);
    this.extraClass.subjectSubscription = subject.subscribe((value) => {
      if (value) this.goToTornillosPage();
    });
  }

  ngOnDestroy(): void {
    if (this.extraClass.subjectSubscription)
      this.extraClass.subjectSubscription.unsubscribe();
  }
}
