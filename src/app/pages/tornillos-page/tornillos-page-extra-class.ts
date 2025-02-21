import { PageEvent } from '@angular/material/paginator';
import { iButtonOptions } from '../../interfaces/iButtonOptions';
import { iPaginatorOptions } from '../../interfaces/iPaginatorOptions';
import { iTableHeaderAndVariable } from '../../interfaces/iTableHeaderAndVariable';
import { iTornillos } from '../../interfaces/iTornillos';
import { Subscription } from 'rxjs';

export class TornillosPageExtraClass {
  constructor(
    public handlePagination: (event: PageEvent) => void,
    public openNewTornilloModal: () => void
  ) {}

  isDataLoaded: boolean = false;

  dataSource: iTornillos[] = [];

  displayedColumns: iTableHeaderAndVariable[] = [];

  addProductButtonOptions: iButtonOptions = {
    class: 'primary',
    disabled: false,
    onClick: () => this.openNewTornilloModal(),
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
}
