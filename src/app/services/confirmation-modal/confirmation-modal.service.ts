import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ConfirmationModalComponent } from '../../modal/confirmation-modal/confirmation-modal.component';
import { iConfirmationModalContent } from '../../interfaces/iConfirmationModalContent';

@Injectable({
  providedIn: 'root',
})
export class confirmationModalService {
  private dialogSubscription: Subscription | null = null;

  constructor(private dialog: MatDialog) {}

  /**
   * openDialog
   * @param {Subject<any>} subject
   * @param {iConfirmationModalContent} data
   * Function that opens the login modal
   */
  openDialog(subject: Subject<any>, data: iConfirmationModalContent): void {
    // we store the reference of the dialog to get the information once is closed
    const dialog = this.dialog.open(ConfirmationModalComponent, { data: data });

    // We subscribe to the observable of the dialog to get the information once is closed
    this.dialogSubscription = dialog
      .afterClosed()
      .pipe(takeUntil(subject))
      .subscribe((result: boolean) => {
        // We send the result through the subject to the subscription handles it
        subject.next(result);
        subject.complete();
      });
  }

  /**
   * ngOnDestroy
   * Function that unsubscribes from the subscription when the service is destroyed
   */
  private ngOnDestroy(): void {
    if (this.dialogSubscription) this.dialogSubscription.unsubscribe();
  }
}
