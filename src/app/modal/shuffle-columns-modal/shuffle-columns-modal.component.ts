import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../components/button/button.component';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { iTableHeaderAndVariable } from '../../interfaces/iTableHeaderAndVariable';
import { UsefulService } from '../../services/useful/useful.service';
import { ShuffleColumnsModalExtraClass } from './shuffle-columns-modal-extra-class';

@Component({
  selector: 'app-shuffle-columns-modal',
  imports: [
    MatIconModule,
    MatDialogModule,
    ButtonComponent,
    DragDropModule,
    CommonModule,
  ],
  templateUrl: './shuffle-columns-modal.component.html',
  styleUrl: './shuffle-columns-modal.component.scss',
})
export class ShuffleColumnsModalComponent {
  /**
   * extraClass
   * @type {ShuffleColumnsModalExtraClass}
   * Auxiliar class where all the variables are stored
   * This class is used to store all the variables and functions needed for the component to work
   */
  extraClass: ShuffleColumnsModalExtraClass = new ShuffleColumnsModalExtraClass(
    this.closePopup.bind(this),
    this.submitSortedColumns.bind(this)
  );

  /**
   * Constructor
   * @param data
   * @param dialogRef
   * This constructor is used to inject the data needed to display the modal and the dialog reference to close the modal
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ShuffleColumnsModalComponent>
  ) {}

  /**
   * ngOnInit
   * This function is used to initialize the component.
   */
  ngOnInit(): void {
    this.getColumnsAndSortThem();
  }

  /**
   * getColumnsAndSortThem
   * This function is used to get the columns and sort them by their index
   */
  getColumnsAndSortThem(): void {
    // We get the columns from data, and we sort them by their index
    const sortedColumns = this.data.columns.sort(
      (a: iTableHeaderAndVariable, b: iTableHeaderAndVariable) => {
        return a.index - b.index;
      }
    );

    // We set the sorted columns in the extra class
    this.extraClass.sortedColumns = sortedColumns;
  }

  /**
   * drop
   * This function is used to drop the element in the list
   * @param event
   */
  onDrop(event: CdkDragDrop<any, any, any>) {
    // We get the previous and current index
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    // We call the swapArrayElements function from the UsefulService to swap the elements
    const swappedColumnsArray = UsefulService.swapArrayElements(
      this.extraClass.sortedColumns,
      previousIndex,
      currentIndex
    );

    // We call the resetIndexes function from the UsefulService to reset the indexes of the array, and we store it in the sortedColumns variable
    this.extraClass.sortedColumns =
      UsefulService.resetIndexes(swappedColumnsArray);
  }

  /**
   * swapProperty
   * This function is used to swap the property of the element
   * @param element
   * @param property
   */
  swapProperty(element: iTableHeaderAndVariable, property: string): void {
    // To switch the pinned and visible properties
    element[property] = !element[property];
  }

  /**
   * submitSortedColumns
   * This function is used to submit the sorted columns
   */
  submitSortedColumns(): void {
    this.dialogRef.close(this.extraClass.sortedColumns);
  }

  /**
   * closePopup
   * This function is used to close the popup
   */
  closePopup(): void {
    this.dialogRef.close(false);
  }
}
