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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tornillos-page',
  imports: [LoaderComponent, MatIconModule, TableComponent, ButtonComponent],
  templateUrl: './tornillos-page.component.html',
  styleUrl: './tornillos-page.component.scss',
})
export class TornillosPageComponent {
  isDataLoaded: boolean = false;

  dataSource: iTornillos[] = [];

  displayedColumns: iTableHeaderAndVariable[] = [
    {
      header: 'Nombre',
      variable: 'nombre',
      index: 0,
      pinned: true,
      visible: true,
    },
    {
      header: 'Precio',
      variable: 'precio',
      index: 1,
      pinned: false,
      visible: true,
    },
    {
      header: 'Formato',
      variable: 'formato',
      index: 2,
      pinned: false,
      visible: true,
    },
    {
      header: 'Marca',
      variable: 'marca',
      index: 3,
      pinned: false,
      visible: true,
    },
  ];

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

  constructor(
    private tornillosSE: TornillosService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isDataLoaded = true;
      this.dataSource = this.tornillosSE.getTornillosPaginated(
        this.pageIndex,
        this.pageSize
      );
      this.setTornillosCount();
    }, 1000);
  }

  setTornillosCount() {
    this.paginatorOptions.length = this.tornillosSE.getTornillosCount();
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
          this.displayedColumns = result;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.shuffleColumnsModalSubscription)
      this.shuffleColumnsModalSubscription.unsubscribe();
  }
}
