interface Puzzle {
  cardId: number;
  name: string;
  url: string;
}

interface PuzzleSize {
  col: number;
  row: number;
}

type PuzzleProps = {
  puzzle: Puzzle[],
  puzzleSize: PuzzleSize
}
