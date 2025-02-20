import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsefulService {
  static swapArrayElements(array: any[], indexA: number, indexB: number) {
    const element = array[indexA];

    const befroeElementArray = array
      .slice(0, indexA)
      .filter((el) => el !== element);
    const afterElementArray = array
      .slice(indexA + 1)
      .filter((el) => el !== element);

    const beforeElementArrayLength = befroeElementArray.length;

    if (indexB > beforeElementArrayLength) {
      const afterIndexB = indexB - beforeElementArrayLength;
      return [
        ...befroeElementArray,
        ...afterElementArray.slice(0, afterIndexB),
        element,
        ...afterElementArray.slice(afterIndexB),
      ];
    } else {
      return [
        ...befroeElementArray.slice(0, indexB),
        element,
        ...befroeElementArray.slice(indexB),
        ...afterElementArray,
      ];
    }
  }

  static resetIndexes(array: any[]) {
    return array.map((el, index) => {
      el.index = index;
      return el;
    });
  }
}
