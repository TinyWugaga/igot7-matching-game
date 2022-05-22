import { useState, useEffect } from "react";

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
    },
    [activeCards]
  );

  const onHitCard = async (index: number) => {
    if (!isHitting && activeCards.length < 2) {
      setActiveCards([...activeCards, index]);
    }
  };

  useEffect(() => {
    resetGame();
  }, [puzzle]);

  const resetGame = () => {
    setActiveCards([]);
    setHitCards([]);
    setIsHitting(false);
  };

  return {
    activeCards,
    hitCards,
    onHitCard,
    resetGame
  };
}
