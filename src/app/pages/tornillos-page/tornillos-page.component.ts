import { Component } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from '../../components/table/table.component';
import { iTableHeaderAndVariable } from '../../interfaces/iTableHeaderAndVariable';
import { ButtonComponent } from '../../components/button/button.component';
import { PageEvent } from '@angular/material/paginator';
import { TornillosService } from '../../services/tornillos/tornillos.service';
import { MatDialog } from '@angular/material/dialog';
import { ShuffleColumnsModalComponent } from '../../modal/shuffle-columns-modal/shuffle-columns-modal.component';
import { Subject } from 'rxjs';
import { TornillosTableHeaderService } from '../../services/tornillos-table-handler/tornillos-table-header.service';
import { NewTornilloModalComponent } from '../../modal/new-tornillo-modal/new-tornillo-modal.component';
import { confirmationModalService } from '../../services/confirmation-modal/confirmation-modal.service';
import { iConfirmationModalContent } from '../../interfaces/iConfirmationModalContent';
import { TornillosPageExtraClass } from './tornillos-page-extra-class';

@Component({
  selector: 'app-tornillos-page',
  imports: [LoaderComponent, MatIconModule, TableComponent, ButtonComponent],
  templateUrl: './tornillos-page.component.html',
  styleUrl: './tornillos-page.component.scss',
})
export class TornillosPageComponent {
  /**
   * extraClass
   * @type {TornillosPageExtraClass}
   * Auxiliar class where all the variables are stored
   */
  extraClass: TornillosPageExtraClass = new TornillosPageExtraClass(
    this.handlePagination.bind(this),
    this.openNewTornilloModal.bind(this)
  );

  /**
   * Constructor
   * @param tornillosSE
   * @param dialog
   * @param tornillosTableHeaderSE
   * @param confirmationModalSE
   * This constructor is used to inject the services needed to handle the data and the dialog reference to open the modals
   */
  constructor(
    private tornillosSE: TornillosService,
    private dialog: MatDialog,
    private tornillosTableHeaderSE: TornillosTableHeaderService,
    private confirmationModalSE: confirmationModalService
  ) {}

  /**
   * ngOnInit
   * This function is used to initialize the component.
   */
  ngOnInit(): void {
    // We set a timeout to simulate the loading of the data
    setTimeout(() => {
      this.setDataLoadedAsTrue();
      this.getTornillosPaginated();
      this.getTornillosCount();
      this.getTornillosTableHeader();

      // It is set to wait for the data one second to be loaded before displaying the table
    }, 1000);
  }

  /**
   * setDataLoadedAsTrue
   * This function is used to set the data as loaded
   */
  setDataLoadedAsTrue() {
    this.extraClass.isDataLoaded = true;
  }

  /**
   * getTornillosPaginated
   * This function is used to get the tornillos paginated
   * It will get the data from the service and set it in the dataSource variable
   */
  getTornillosPaginated() {
    this.extraClass.dataSource = this.tornillosSE.getTornillosPaginated(
      this.extraClass.pageIndex,
      this.extraClass.pageSize
    );
  }

  /**
   * getTornillosCount
   * This function is used to get the count of the tornillos
   * It will get the data from the service and set it in the paginatorOptions variable
   */
  getTornillosCount() {
    this.extraClass.paginatorOptions.length =
      this.tornillosSE.getTornillosCount();
  }

  /**
   * getTornillosTableHeader
   * This function is used to get the tornillos table header
   * It will get the data from the service and set it in the displayedColumns variable
   */
  getTornillosTableHeader() {
    this.extraClass.displayedColumns =
      this.tornillosTableHeaderSE.getTornillosTableHeader();
  }

  /**
   * setTornillosTableHeader
   * This function is used to set the tornillos table header
   * @param result:iTableHeaderAndVariable[]
   *
   */
  setTornillosTableHeader(result: iTableHeaderAndVariable[]) {
    this.tornillosTableHeaderSE.setTornillosTableHeader(result);
  }

  /**
   * handlePagination
   * This function is used to handle the pagination
   * @param event:PageEvent
   */
  handlePagination(event: PageEvent) {
    // We set the pageIndex and pageSize in the extraClass
    this.extraClass.pageIndex = event.pageIndex;
    this.extraClass.pageSize = event.pageSize;
    // We get the tornillos paginated
    this.getTornillosPaginated();
  }

  /**
   * openShuffleColumnsModal
   * This function is used to open the shuffle columns modal
   */
  openShuffleColumnsModal() {
    // We open the shuffle columns modal, passing the columns to be displayed
    const shuffleColumnsModal = this.dialog.open(ShuffleColumnsModalComponent, {
      data: { columns: this.extraClass.displayedColumns },
    });

    // We subscribe to the afterClosed event of the modal
    this.extraClass.shuffleColumnsModalSubscription = shuffleColumnsModal
      .afterClosed()
      .subscribe((result) => {
        // If the result is true, we set the displayed columns and the table header
        if (result) {
          this.extraClass.displayedColumns = [...result];
          this.setTornillosTableHeader(result);
        }
      });
  }

  /**
   * openNewTornilloModal
   * This function is used to open the new tornillo modal
   */
  openNewTornilloModal() {
    // We open the new tornillo modal
    const newTornilloModal = this.dialog.open(NewTornilloModalComponent);

    // We subscribe to the afterClosed event of the modal
    this.extraClass.newTornilloModalSubscription = newTornilloModal
      .afterClosed()
      .subscribe((result) => {
        // If the result is true, we add the tornillo to the list, and we get the count and the paginated data
        if (result) {
          this.tornillosSE.addTornillo(result);
          this.getTornillosCount();
          this.getTornillosPaginated();
        }
      });
  }

  /**
   * deleteTornillo
   * @param id:number
   * This function is used to delete a tornillo
   */
  deleteTornillo(id: number) {
    // We create a subject for the pagination modal
    const subject: Subject<any> = new Subject<any>();

    // We establish the content of the confirmation modal
    const confirmationModalContent: iConfirmationModalContent = {
      action: 'Eliminar',
      content: '¿Desea eliminar el elemento seleccionado?',
    };
    // We open the confirmation modal
    this.confirmationModalSE.openDialog(subject, confirmationModalContent);
    subject.subscribe((result) => {
      // If the result is true, we delete the tornillo, and we get the count and the paginated data
      if (result) {
        this.tornillosSE.deleteTornillo(id);
        this.getTornillosCount();
        this.getTornillosPaginated();
      }
    });
  }

  /**
   * ngOnDestroy
   * This function is used to unsubscribe from the subscription when the component is destroyed
   */
  ngOnDestroy(): void {
    if (this.extraClass.shuffleColumnsModalSubscription)
      this.extraClass.shuffleColumnsModalSubscription.unsubscribe();
    if (this.extraClass.newTornilloModalSubscription)
      this.extraClass.newTornilloModalSubscription.unsubscribe();
  }
}
