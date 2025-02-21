import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginModalService } from './loginModal.service';
import { LoginModalComponent } from '../../modal/login-modal/login-modal.component';
import { TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';

describe('LoginModalService', () => {
  let service: LoginModalService;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<LoginModalComponent>>;

  beforeEach(() => {
    const dialogSpyObj = jasmine.createSpyObj('MatDialog', ['open']);
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', [
      'afterClosed',
    ]);

    TestBed.configureTestingModule({
      providers: [
        LoginModalService,
        { provide: MatDialog, useValue: dialogSpyObj },
      ],
    });

    service = TestBed.inject(LoginModalService);
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    dialogRefSpy = dialogRefSpyObj;
  });

  it('shoud be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open the dialog and subscribe to afterClosed', () => {
    const subject = new Subject<any>();
    dialogRefSpy.afterClosed.and.returnValue(of({ username: 'testuser' }));
    dialogSpy.open.and.returnValue(dialogRefSpy as any);

    service.openDialog(subject);

    expect(dialogSpy.open).toHaveBeenCalledWith(LoginModalComponent);
    dialogRefSpy.afterClosed().subscribe((result) => {
      expect(result).toEqual({ username: 'testuser' });
    });
  });
});
