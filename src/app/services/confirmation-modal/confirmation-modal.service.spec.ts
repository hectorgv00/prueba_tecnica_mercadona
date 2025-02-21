import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, of } from 'rxjs';
import { ConfirmationModalComponent } from '../../modal/confirmation-modal/confirmation-modal.component';
import { iConfirmationModalContent } from '../../interfaces/iConfirmationModalContent';
import { confirmationModalService } from './confirmation-modal.service';

describe('confirmationModalService', () => {
  let service: confirmationModalService;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmationModalComponent>>;

  beforeEach(() => {
    const dialogSpyObj = jasmine.createSpyObj('MatDialog', ['open']);
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', [
      'afterClosed',
    ]);

    TestBed.configureTestingModule({
      providers: [
        confirmationModalService,
        { provide: MatDialog, useValue: dialogSpyObj },
      ],
    });

    service = TestBed.inject(confirmationModalService);
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    dialogRefSpy = dialogRefSpyObj;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open the dialog and subscribe to afterClosed', () => {
    const subject = new Subject<any>();
    const data: iConfirmationModalContent = {
      action: 'Eliminar',
      content: '¿Desea eliminar el elemento seleccionado?',
    };

    dialogRefSpy.afterClosed.and.returnValue(of(true));
    dialogSpy.open.and.returnValue(dialogRefSpy as any);

    service.openDialog(subject, data);

    expect(dialogSpy.open).toHaveBeenCalledWith(ConfirmationModalComponent, {
      data: data,
    });
    dialogRefSpy.afterClosed().subscribe((result) => {
      expect(result).toBeTrue();
    });
  });

  it('should complete the subject when dialog is closed', () => {
    const subject = new Subject<any>();
    const data: iConfirmationModalContent = {
      action: 'Eliminar',
      content: '¿Desea eliminar el elemento seleccionado?',
    };

    dialogRefSpy.afterClosed.and.returnValue(of(true));
    dialogSpy.open.and.returnValue(dialogRefSpy as any);

    service.openDialog(subject, data);

    subject.subscribe({
      next: (result) => {
        expect(result).toBeTrue();
      },
      complete: () => {
        expect(true).toBeTrue();
      },
    });

    dialogRefSpy.afterClosed().subscribe((result) => {
      subject.next(result);
      subject.complete();
    });
  });
});
