import { Component } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from '../../components/table/table.component';
import { iTornillos } from '../../interfaces/iTornillos';
import { iTableHeaderAndVariable } from '../../interfaces/iTableHeaderAndVariable';
import { ButtonComponent } from '../../components/button/button.component';
import { iButtonOptions } from '../../interfaces/iButtonOptions';
import { iPaginatorOptions } from '../../interfaces/iPaginatorOptions';
import { PageEvent } from '@angular/material/paginator';
import { TornillosService } from '../../services/tornillos.service';
import { MatDialog } from '@angular/material/dialog';
import { ShuffleColumnsModalComponent } from '../../modal/shuffle-columns-modal/shuffle-columns-modal.component';
import { Subject, Subscription } from 'rxjs';
import { TornillosTableHeaderService } from '../../services/tornillos-table-header.service';
import { NewTornilloModalComponent } from '../../modal/new-tornillo-modal/new-tornillo-modal.component';
import { confirmationModalService } from '../../services/confirmation-modal.service';
import { iConfirmationModalContent } from '../../interfaces/iConfirmationModalContent';

@Component({
  selector: 'app-tornillos-page',
  imports: [LoaderComponent, MatIconModule, TableComponent, ButtonComponent],
  templateUrl: './tornillos-page.component.html',
  styleUrl: './tornillos-page.component.scss',
})
export class TornillosPageComponent {
  isDataLoaded: boolean = false;

  dataSource: iTornillos[] = [];

  displayedColumns: iTableHeaderAndVariable[] = [];

  addProductButtonOptions: iButtonOptions = {
    class: 'primary',
    disabled: false,
    onClick: () => {
      console.log('Add product button clicked');
    },
    text: 'Añadir producto',
  };

  paginatorOptions: iPaginatorOptions = {
    onPageChange: (event: PageEvent) => this.handlePagination(event),
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
    length: 20,
    showFirstLastButtons: true,
    pageIndex: 0,
    disabled: false,
  };

  // Pagination
  pageIndex: number = 0;
  pageSize: number = 5;

  // subscription
  shuffleColumnsModalSubscription: Subscription | null = null;
  newTornilloModalSubscription: Subscription | null = null;

  constructor(
    private tornillosSE: TornillosService,
    private dialog: MatDialog,
    private tornillosTableHeaderSE: TornillosTableHeaderService,
    private confirmationModalSE: confirmationModalService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isDataLoaded = true;
      this.dataSource = this.tornillosSE.getTornillosPaginated(
        this.pageIndex,
        this.pageSize
      );
      this.getTornillosCount();
      this.getTornillosTableHeader();
    }, 1000);
  }

  getTornillosCount() {
    this.paginatorOptions.length = this.tornillosSE.getTornillosCount();
  }

  getTornillosTableHeader() {
    this.displayedColumns =
      this.tornillosTableHeaderSE.getTornillosTableHeader();
    console.log(this.displayedColumns);
  }

  setTornillosTableHeader(result: iTableHeaderAndVariable[]) {
    this.tornillosTableHeaderSE.setTornillosTableHeader(result);
  }

  handlePagination(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.dataSource = this.tornillosSE.getTornillosPaginated(
      this.pageIndex,
      this.pageSize
    );
  }

  openShuffleColumnsModal() {
    const shuffleColumnsModal = this.dialog.open(ShuffleColumnsModalComponent, {
      data: { columns: this.displayedColumns },
    });

    this.shuffleColumnsModalSubscription = shuffleColumnsModal
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.displayedColumns = [...result];
          this.setTornillosTableHeader(result);
        }
      });
  }

  openNewTornilloModal() {
    const newTornilloModal = this.dialog.open(NewTornilloModalComponent);

    this.newTornilloModalSubscription = newTornilloModal
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          console.log(result);
          this.tornillosSE.addTornillo(result);
          this.getTornillosCount();
          this.dataSource = this.tornillosSE.getTornillosPaginated(
            this.pageIndex,
            this.pageSize
          );
        }
      });
  }

  deleteTornillo(id: number) {
    console.log('Delete tornillo with id:', id);
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
        this.dataSource = this.tornillosSE.getTornillosPaginated(
          this.pageIndex,
          this.pageSize
        );
      }
    });
  }

  ngOnDestroy(): void {
    if (this.shuffleColumnsModalSubscription)
      this.shuffleColumnsModalSubscription.unsubscribe();
    if (this.newTornilloModalSubscription)
      this.newTornilloModalSubscription.unsubscribe();
  }
}
