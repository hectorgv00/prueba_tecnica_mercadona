import { UsefulService } from './useful.service';
import { iTableHeaderAndVariable } from '../../interfaces/iTableHeaderAndVariable';

describe('UsefulService', () => {
  it('should reset indexes correctly', () => {
    const input = [{ name: 'A' }, { name: 'B' }, { name: 'C' }];
    const expectedOutput = [
      { name: 'A', index: 0 },
      { name: 'B', index: 1 },
      { name: 'C', index: 2 },
    ];

    const result = UsefulService.resetIndexes(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should swap elements correctly', () => {
    const input: iTableHeaderAndVariable[] = [
      {
        name: 'A',
        pinned: false,
        header: 'A',
        index: 0,
        variable: 'a',
        visible: true,
      },
      {
        name: 'B',
        pinned: false,
        header: 'B',
        index: 1,
        variable: 'b',
        visible: true,
      },
      {
        name: 'C',
        pinned: false,
        header: 'C',
        index: 2,
        variable: 'c',
        visible: true,
      },
    ];
    const expectedOutput = [
      {
        name: 'B',
        pinned: false,
        header: 'B',
        index: 1,
        variable: 'b',
        visible: true,
      },
      {
        name: 'A',
        pinned: false,
        header: 'A',
        index: 0,
        variable: 'a',
        visible: true,
      },
      {
        name: 'C',
        pinned: false,
        header: 'C',
        index: 2,
        variable: 'c',
        visible: true,
      },
    ];

    const result = UsefulService.swapArrayElements(input, 0, 1);
    expect(result).toEqual(expectedOutput);
  });

  it('should not move pinned elements when swapping', () => {
    const input: iTableHeaderAndVariable[] = [
      {
        name: 'A',
        pinned: true,
        header: 'A',
        index: 0,
        variable: 'a',
        visible: true,
      },
      {
        name: 'B',
        pinned: false,
        header: 'B',
        index: 1,
        variable: 'b',
        visible: true,
      },
      {
        name: 'C',
        pinned: false,
        header: 'C',
        index: 2,
        variable: 'c',
        visible: true,
      },
    ];
    const expectedOutput = [
      {
        name: 'A',
        pinned: true,
        header: 'A',
        index: 0,
        variable: 'a',
        visible: true,
      },
      {
        name: 'C',
        pinned: false,
        header: 'C',
        index: 2,
        variable: 'c',
        visible: true,
      },
      {
        name: 'B',
        pinned: false,
        header: 'B',
        index: 1,
        variable: 'b',
        visible: true,
      },
    ];

    const result = UsefulService.swapArrayElements(input, 1, 2);
    expect(result).toEqual(expectedOutput);
  });

  it('should correctly get the source index from non-pinned elements', () => {
    const arrayToSort: iTableHeaderAndVariable[] = [
      {
        name: 'A',
        pinned: false,
        header: 'A',
        index: 0,
        variable: 'a',
        visible: true,
      },
      {
        name: 'B',
        pinned: false,
        header: 'B',
        index: 1,
        variable: 'b',
        visible: true,
      },
      {
        name: 'C',
        pinned: false,
        header: 'C',
        index: 2,
        variable: 'c',
        visible: true,
      },
    ];
    const nonPinnedElements = [arrayToSort[1], arrayToSort[2]];
    const sourceIndex = UsefulService['getSourceIndex'](
      arrayToSort,
      1,
      nonPinnedElements
    );
    expect(sourceIndex).toBe(0);
  });

  it('should correctly determine target index in non-pinned array', () => {
    const availableIndices = [1, 2, 3];
    const targetIndex = UsefulService['getTargetIndexInNonPinned'](
      availableIndices,
      2
    );
    expect(targetIndex).toBe(1);
  });
});
