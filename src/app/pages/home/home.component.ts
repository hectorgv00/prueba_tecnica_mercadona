import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { iButtonOptions } from '../../interfaces/iButtonOptions';
import { TornillosService } from '../../services/tornillos.service';
import { LoginService } from '../../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalService } from '../../services/loginModal.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [TornillosService, LoginModalService],
})
export class HomeComponent {
  revisarButtonOptions: iButtonOptions = {
    class: 'primary',
    text: 'Revisar',
    disabled: false,
    onClick: () => this.onReviewClick(),
    icon: 'visibility',
  };

  tornilloCount: number = 0;

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
    this.tornilloCount = this.tornillosSE.getTornillosCount();
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
    subject.subscribe((value) => {
      if (value) this.goToTornillosPage();
    });
  }
}
