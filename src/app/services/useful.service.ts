import { Injectable } from '@angular/core';
import { iTableHeaderAndVariable } from '../interfaces/iTableHeaderAndVariable';

@Injectable({
  providedIn: 'root',
})
export class UsefulService {
  // This method is used to reset the indexes of an array of objects
  static resetIndexes(array: any[]) {
    return array.map((el, index) => {
      el.index = index;
      return el;
    });
  }

  // This method is used to swap the elements of an array of objects
  static swapArrayElements(
    arrayToSort: iTableHeaderAndVariable[],
    indexA: number,
    indexB: number
  ) {
    // First we are going to separate the pinned elements from the non-pinned elements
    const pinnedElements: tPinedElements[] = [];
    const nonPinnedElements: iTableHeaderAndVariable[] = [];
    const availableIndices: number[] = [];

    // We get the splitted arrays
    this.separetePinnedAndNonPinnedElements(
      arrayToSort,
      pinnedElements,
      nonPinnedElements,
      availableIndices
    );

    // We get the sourceIndex in the nonPinnedElements array
    const sourceIndex = this.getSourceIndex(
      arrayToSort,
      indexA,
      nonPinnedElements
    );

    // We get the targetIndex in the nonPinnedElements array
    const targetIndexInNonPinned = this.getTargetIndexInNonPinned(
      availableIndices,
      indexB
    );

    // Create a new array with the non-pinned elements sorted
    const newNonPinned = [...nonPinnedElements];

    // We get the element that we are going to move from the sourceIndex in the newNonPinned array
    const movedElement = newNonPinned.splice(sourceIndex, 1)[0];

    // We insert the element in the targetIndexInNonPinned in the newNonPinned array
    newNonPinned.splice(targetIndexInNonPinned, 0, movedElement);

    // Create a new array with the same length as the original array
    const newArray = new Array(arrayToSort.length);

    // Fill the pinned elements in their respective indices
    pinnedElements.forEach(({ index, element }) => {
      newArray[index] = element;
    });

    // We use the availableIndices array to know where to insert the non-pinned elements in the newArray
    availableIndices.forEach((index: number, i: number) => {
      newArray[index] = newNonPinned[i];
    });

    return newArray;
  }

  // This method is used to separate the pinned elements from the non-pinned elements
  private static separetePinnedAndNonPinnedElements(
    arrayToSort: iTableHeaderAndVariable[],
    pinnedElements: tPinedElements[],
    nonPinnedElements: iTableHeaderAndVariable[],
    availableIndices: number[]
  ) {
    arrayToSort.forEach((element: iTableHeaderAndVariable, index: number) => {
      // If the elment is pinned, it is sent to the pinnedElements array
      if (element.pinned) {
        pinnedElements.push({ index, element });
      } else {
        // Otherwise, it is sent to the nonPinnedElements array and the index is added to the availableIndices array
        nonPinnedElements.push(element);
        availableIndices.push(index);
      }
    });
  }

  // This method is used to get the sourceIndex in the nonPinnedElements array
  private static getSourceIndex(
    arrayToSort: iTableHeaderAndVariable[],
    indexA: number,
    nonPinnedElements: iTableHeaderAndVariable[]
  ) {
    // Find the sourceIndex in nonPinnedElements
    const elementToMove = arrayToSort[indexA];
    const sourceIndex = nonPinnedElements.findIndex(
      (el) => el === elementToMove
    );
    return sourceIndex;
  }

  // This method is used to get the targetIndex in the nonPinnedElements array
  private static getTargetIndexInNonPinned(
    availableIndices: number[],
    indexB: number
  ) {
    let targetIndexInNonPinned: number;

    // We search for the indexB in the availableIndices array
    const indexBInAvailable = availableIndices.indexOf(indexB);

    // If it is found, we use it as the target index
    if (indexBInAvailable !== -1) {
      targetIndexInNonPinned = indexBInAvailable;
      return targetIndexInNonPinned;
    }
    // If it is not found, we look for the indexes that are before indexB
    const indexesBeforeIndexB = availableIndices.filter(
      (availableIndex) => availableIndex < indexB
    );

    // If there are indexes before indexB
    if (indexesBeforeIndexB.length > 0) {
      // We get the last index before B
      const lastÏndexBEforeB =
        indexesBeforeIndexB[indexesBeforeIndexB.length - 1];

      // And we set it as the target index
      targetIndexInNonPinned = availableIndices.indexOf(lastÏndexBEforeB);
    } else {
      // If there are no indexes before indexB, we set the target index to 0
      targetIndexInNonPinned = 0;
    }

    // we return the target index
    return targetIndexInNonPinned;
  }
}

type tPinedElements = {
  index: number;
  element: iTableHeaderAndVariable;
};
