import { PageEvent } from '@angular/material/paginator';
import { iButtonOptions } from '../../interfaces/iButtonOptions';
import { iPaginatorOptions } from '../../interfaces/iPaginatorOptions';
import { iTableHeaderAndVariable } from '../../interfaces/iTableHeaderAndVariable';
import { iTornillos } from '../../interfaces/iTornillos';
import { Subscription } from 'rxjs';

export class TornillosPageExtraClass {
  /**
   * constructor
   * @param {(event: PageEvent) => void} handlePagination
   * @param {() => void} openNewTornilloModal
   * This constructor is used to initialize the class with the functions that will be used in the component
   */
  constructor(
    public handlePagination: (event: PageEvent) => void,
    public openNewTornilloModal: () => void
  ) {}

  /**
   * isDataLoaded
   * @type {boolean}
   * This variable is used to store the state of the data loaded
   */
  isDataLoaded: boolean = false;

  /**
   * dataSource
   * @type {iTornillos[]}
   * This variable is used to store the data source of the table
   */
  dataSource: iTornillos[] = [];

  /**
   * displayedColumns
   * @type {iTableHeaderAndVariable[]}
   * This variable is used to store the displayed columns of the table
   */
  displayedColumns: iTableHeaderAndVariable[] = [];

  /**
   * addProductButtonOptions
   * @type {iButtonOptions}
   * This variable is used to store the options of the add product button
   */
  addProductButtonOptions: iButtonOptions = {
    class: 'primary',
    disabled: false,
    onClick: () => this.openNewTornilloModal(),
    text: 'Añadir producto',
  };

  /**
   * paginatorOptions
   * @type {iPaginatorOptions}
   * This variable is used to store the options of the paginator
   */
  paginatorOptions: iPaginatorOptions = {
    onPageChange: (event: PageEvent) => this.handlePagination(event),
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
    length: 20,
    showFirstLastButtons: true,
    pageIndex: 0,
    disabled: false,
  };

  /**
   * pageIndex
   * @type {number}
   * This variable is used to store the index of the page
   */
  pageIndex: number = 0;

  /**
   * pageSize
   * @type {number}
   * This variable is used to store the size of the page
   */
  pageSize: number = 5;

  /**
   * shuffleColumnsModalSubscription
   * @type {Subscription | null}
   * This variable is used to store the subscription of the shuffleColumnsModal
   */
  shuffleColumnsModalSubscription: Subscription | null = null;

  /**
   * newTornilloModalSubscription
   * @type {Subscription | null}
   * This variable is used to store the subscription of the newTornilloModal
   */
  newTornilloModalSubscription: Subscription | null = null;
}
