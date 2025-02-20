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
import { UsefulService } from '../../services/useful.service';

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
  sortedColumns: iTableHeaderAndVariable[] = [];

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

    this.sortedColumns = sortedColumns;
  }

  onDrop(event: CdkDragDrop<any, any, any>) {
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    this.sortedColumns = UsefulService.swapArrayElements(
      this.sortedColumns,
      previousIndex,
      currentIndex
    );
  }

  swapProperty(element: iTableHeaderAndVariable, property: string): void {
    console.log(element);
    element[property] = !element[property];
    console.log(element);
  }
}
