import { PageEvent } from '@angular/material/paginator';

export interface iPaginatorOptions {
  onPageChange: (event: PageEvent) => void;
  pageSize: number;
  pageSizeOptions: number[];
  length: number;
  showFirstLastButtons: boolean;
  pageIndex: number;
  disabled: boolean;
}
