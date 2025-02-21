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
  extraClass: ShuffleColumnsModalExtraClass = new ShuffleColumnsModalExtraClass(
    this.closePopup.bind(this),
    this.submitSortedColumns.bind(this)
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ShuffleColumnsModalComponent>
  ) {}

  ngOnInit(): void {
    this.getColumnsAndSortThem();
  }

  getColumnsAndSortThem(): void {
    const sortedColumns = this.data.columns.sort(
      (a: iTableHeaderAndVariable, b: iTableHeaderAndVariable) => {
        return a.index - b.index;
      }
    );

    this.extraClass.sortedColumns = sortedColumns;
  }

  onDrop(event: CdkDragDrop<any, any, any>) {
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    const swappedColumnsArray = UsefulService.swapArrayElements(
      this.extraClass.sortedColumns,
      previousIndex,
      currentIndex
    );

    this.extraClass.sortedColumns =
      UsefulService.resetIndexes(swappedColumnsArray);
  }

  swapProperty(element: iTableHeaderAndVariable, property: string): void {
    element[property] = !element[property];
  }

  submitSortedColumns(): void {
    this.dialogRef.close(this.extraClass.sortedColumns);
  }

  closePopup(): void {
    this.dialogRef.close(false);
  }
}
