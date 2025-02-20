import { Injectable } from '@angular/core';
import { iTableHeaderAndVariable } from '../interfaces/iTableHeaderAndVariable';

@Injectable({
  providedIn: 'root',
})
export class UsefulService {
  static swapArrayElements(
    arrayToSort: iTableHeaderAndVariable[],
    indexA: number,
    indexB: number
  ) {
    // First we are going to separate the pinned elements from the non-pinned elements
    const pinnedElements: tPinedElements[] = [];
    const nonPinnedElements: iTableHeaderAndVariable[] = [];
    const availableIndices: number[] = [];

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

    // Find the sourceIndex in nonPinnedElements
    const elementToMove = arrayToSort[indexA];
    const sourceIndex = nonPinnedElements.findIndex(
      (el) => el === elementToMove
    );

    // If for some reason the element is not found, return the original array. This should not happen, as when an element is pinned, it is not draggable
    if (sourceIndex === -1) {
      return arrayToSort;
    }

    // Now we check if the target index is in the availableIndices array
    let targetIndexInNonPinned: number;
    const indexBInAvailable = availableIndices.indexOf(indexB);
    if (indexBInAvailable !== -1) {
      // If it is, we use that index
      targetIndexInNonPinned = indexBInAvailable;
    } else {
      // If it is not, we find the index where it should be inserted, by finding the first index greater than indexB so we can insert it there
      let insertionPoint = availableIndices.findIndex((ai) => ai > indexB);
      // If the index is not found, we insert it at the end of the array
      targetIndexInNonPinned =
        insertionPoint === -1 ? availableIndices.length : insertionPoint;
    }

    // We make sure the target index is within the bounds of the nonPinnedElements array
    targetIndexInNonPinned = Math.max(
      0,
      Math.min(targetIndexInNonPinned, nonPinnedElements.length)
    );

    // Reorder the non-pinned elements
    const newNonPinned = [...nonPinnedElements];
    const [movedElement] = newNonPinned.splice(sourceIndex, 1);
    newNonPinned.splice(targetIndexInNonPinned, 0, movedElement);

    // Create a new array with the same length as the original array
    const newArray = new Array(arrayToSort.length);

    // Fill the pinned elements in their respective indices
    pinnedElements.forEach(({ index, element }) => {
      newArray[index] = element;
    });

    // Fill the non-pinned elements in their respective indices
    let nonPinnedIndex = 0;

    // We use the availableIndices array to know where to insert the non-pinned elements in the newArray
    availableIndices.forEach((index) => {
      newArray[index] = newNonPinned[nonPinnedIndex++];
    });

    return newArray;
  }

  static resetIndexes(array: any[]) {
    return array.map((el, index) => {
      el.index = index;
      return el;
    });
  }
}

type tPinedElements = {
  index: number;
  element: iTableHeaderAndVariable;
};
