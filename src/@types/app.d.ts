type FixedSizeArray<N extends number, T> = N extends 0
    ? never[]
    : {
          0: T;
          length: N;
      } & Array<T>;

type sudokuGrid = FixedSizeArray<9, FixedSizeArray<9, number>>;
