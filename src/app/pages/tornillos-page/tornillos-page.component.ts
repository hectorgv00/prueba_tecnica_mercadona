import { Component } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from '../../components/table/table.component';
import { iTableHeaderAndVariable } from '../../interfaces/iTableHeaderAndVariable';
import { ButtonComponent } from '../../components/button/button.component';
import { PageEvent } from '@angular/material/paginator';
import { TornillosService } from '../../services/tornillos.service';
import { MatDialog } from '@angular/material/dialog';
import { ShuffleColumnsModalComponent } from '../../modal/shuffle-columns-modal/shuffle-columns-modal.component';
import { Subject } from 'rxjs';
import { TornillosTableHeaderService } from '../../services/tornillos-table-header.service';
import { NewTornilloModalComponent } from '../../modal/new-tornillo-modal/new-tornillo-modal.component';
import { confirmationModalService } from '../../services/confirmation-modal.service';
import { iConfirmationModalContent } from '../../interfaces/iConfirmationModalContent';
import { TornillosPageExtraClass } from './tornillos-page-extra-class';

@Component({
  selector: 'app-tornillos-page',
  imports: [LoaderComponent, MatIconModule, TableComponent, ButtonComponent],
  templateUrl: './tornillos-page.component.html',
  styleUrl: './tornillos-page.component.scss',
})
export class TornillosPageComponent {
  extraClass: TornillosPageExtraClass = new TornillosPageExtraClass(
    this.handlePagination.bind(this),
    this.openNewTornilloModal.bind(this)
  );

  constructor(
    private tornillosSE: TornillosService,
    private dialog: MatDialog,
    private tornillosTableHeaderSE: TornillosTableHeaderService,
    private confirmationModalSE: confirmationModalService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.setDataLoadedAsTrue();
      this.getTornillosPaginated();
      this.getTornillosCount();
      this.getTornillosTableHeader();
    }, 1000);
  }

  setDataLoadedAsTrue() {
    this.extraClass.isDataLoaded = true;
  }

  getTornillosPaginated() {
    this.extraClass.dataSource = this.tornillosSE.getTornillosPaginated(
      this.extraClass.pageIndex,
      this.extraClass.pageSize
    );
  }

  getTornillosCount() {
    this.extraClass.paginatorOptions.length =
      this.tornillosSE.getTornillosCount();
  }

  getTornillosTableHeader() {
    this.extraClass.displayedColumns =
      this.tornillosTableHeaderSE.getTornillosTableHeader();
  }

  setTornillosTableHeader(result: iTableHeaderAndVariable[]) {
    this.tornillosTableHeaderSE.setTornillosTableHeader(result);
  }

  handlePagination(event: PageEvent) {
    this.extraClass.pageIndex = event.pageIndex;
    this.extraClass.pageSize = event.pageSize;
    this.getTornillosPaginated();
  }

  openShuffleColumnsModal() {
    const shuffleColumnsModal = this.dialog.open(ShuffleColumnsModalComponent, {
      data: { columns: this.extraClass.displayedColumns },
    });

    this.extraClass.shuffleColumnsModalSubscription = shuffleColumnsModal
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.extraClass.displayedColumns = [...result];
          this.setTornillosTableHeader(result);
        }
      });
  }

  openNewTornilloModal() {
    const newTornilloModal = this.dialog.open(NewTornilloModalComponent);

    this.extraClass.newTornilloModalSubscription = newTornilloModal
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.tornillosSE.addTornillo(result);
          this.getTornillosCount();
          this.getTornillosPaginated();
        }
      });
  }

  deleteTornillo(id: number) {
    const subject: Subject<any> = new Subject<any>();
    const confirmationModalContent: iConfirmationModalContent = {
      action: 'Eliminar',
      content: '¿Desea eliminar el elemento seleccionado?',
    };
    this.confirmationModalSE.openDialog(subject, confirmationModalContent);
    subject.subscribe((result) => {
      if (result) {
        this.tornillosSE.deleteTornillo(id);
        this.getTornillosCount();
        this.getTornillosPaginated();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.extraClass.shuffleColumnsModalSubscription)
      this.extraClass.shuffleColumnsModalSubscription.unsubscribe();
    if (this.extraClass.newTornilloModalSubscription)
      this.extraClass.newTornilloModalSubscription.unsubscribe();
  }
}
