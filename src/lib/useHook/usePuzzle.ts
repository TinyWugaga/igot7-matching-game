import axios from "axios";
import { useState, useEffect } from "react";

import { DataBaseType } from "@/lib/notion/types";

function fisherYatesShuffle(arr: any[]): void {
  for (let i: number = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); //random index
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
}

function generatePuzzle(cards: Puzzle[]) {
  const puzzle = cards.concat(cards);
  fisherYatesShuffle(puzzle);
  return puzzle;
}

export function countPuzzleSize(number: number) {
  if (!(number % 8)) {
    return { col: 4 * (number / 8), row: 4 };
  }
  if (!(number % 9)) {
    return { col: 3 * (number / 9), row: 3 };
  }
  if (!(number % 10)) {
    return { col: 5 * (number / 10), row: 4 };
  }
  return { col: number / 2, row: 2 };
}

export async function fetchCardGroups(topic: string) {
  const { data } = await axios.get(`/api/notion/${DataBaseType.GROUPS}`, {
    params: {
      topic,
      sorts: { sorts: [["id", "ascending"]] },
    },
  });

  const groups = data.map((group: any) => ({
    id: group.properties.id.title[0].text.content,
  }));

  return groups;
}

export async function fetchCards(topic: string, groupId: number | string) {
  const { data } = await axios.get(`/api/notion/${DataBaseType.CARDS}`, {
    params: {
      topic,
      filter: {
        compound: "or",
        conditions: ["group_id.rollup.every.rich_text.equals." + groupId],
      },
    },
  });

  const cards = data.map((card: any) => ({
    cardId: card.properties.card_id.number,
    name: card.properties.name.title[0].text.content,
    url: card.properties.image_url.files[0].file.url,
  }));
  return cards;
}

export default function({ topic }: { topic: string }) {
  const [puzzleGroupId, setPuzzleGroupId] = useState(1);
  const [puzzleGroups, setPuzzleGroup] = useState<PuzzleGroup[]>([]);
  const [puzzle, setPuzzle] = useState<Puzzle[]>([]);
  const [puzzleSize, setPuzzleSize] = useState<PuzzleSize>({ col: 0, row: 0 });

  const getPuzzleGroup = async () => {
    const groups = await fetchCardGroups(topic);
    setPuzzleGroup(groups);
  };

  useEffect(() => {
    const initPuzzle = async () => {
      await getPuzzleGroup();
      const cards = await fetchCards(topic, puzzleGroupId);

      setPuzzle(generatePuzzle(cards));
      setPuzzleSize(countPuzzleSize(cards.length));
    };

    if(topic) {
      initPuzzle();
    }
  }, [topic, puzzleGroupId]);

  return {
    setPuzzleGroupId,

    puzzleGroupId,
    puzzleGroups,
    puzzle,
    puzzleSize,
  };
}
