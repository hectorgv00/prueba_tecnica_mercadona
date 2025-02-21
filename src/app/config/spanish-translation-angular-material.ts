import { MatPaginatorIntl } from '@angular/material/paginator';

/***
 *  With this function we can translate the paginator of Angular Material to Spanish
 * @returns {MatPaginatorIntl}
 *
 */
export function getSpanishPaginatorIntl() {
  // We instantiate the MatPaginatorIntl class
  const paginatorIntl = new MatPaginatorIntl();

  // We set the labels of the paginator to Spanish
  paginatorIntl.itemsPerPageLabel = 'Elementos por página:';
  paginatorIntl.nextPageLabel = 'Siguiente';
  paginatorIntl.previousPageLabel = 'Anterior';
  paginatorIntl.firstPageLabel = 'Primera página';
  paginatorIntl.lastPageLabel = 'Última página';

  // We set the range label to Spanish
  paginatorIntl.getRangeLabel = (
    page: number,
    pageSize: number,
    length: number
  ) => {
    // We check all the possible cases, and return the Spanish text instead of the English one
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };

  // We return the paginatorIntl object
  return paginatorIntl;
}
