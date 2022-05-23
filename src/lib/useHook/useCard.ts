import { useState, useEffect, useMemo } from "react";

export default function({ puzzle }: { puzzle: Puzzle[] }) {
  const [activeCards, setActiveCards] = useState<number[]>([]);
  const [hitCards, setHitCards] = useState<number[]>([]);
  const [isHitting, setIsHitting] = useState(false);

  useEffect(() => {
    // TODO: set can't hit status
    setTimeout(() => {
      if (activeCards.length === 2) {
        setIsHitting(true);

        const isHit =
          puzzle[activeCards[0]].cardId === puzzle[activeCards[1]].cardId;

        if (isHit) {
          setHitCards([...hitCards, ...activeCards]);
        }
        setActiveCards([]);
        setIsHitting(false);
      }
    }, 680);
  }, [activeCards]);

  const onHitCard = async (index: number) => {
    if (!isHitting && activeCards.length < 2) {
      setActiveCards([...activeCards, index]);
    }
  };

  const isAllHit = useMemo(() => Boolean(hitCards.length) && (hitCards.length === puzzle.length), [
    hitCards,
    puzzle,
  ]);

  const resetCards = () => {
    setActiveCards([]);
    setHitCards([]);
    setTimeout(() => {
      setIsHitting(false);
    },150)
  };

  return {
    activeCards,
    hitCards,
    isAllHit,

    onHitCard,
    resetCards
  };
}
