import axios from "axios";
import { useState, useCallback, useEffect } from "react";

function fisherYatesShuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); //random index
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
}

export default function({ groupId = 1 }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const getCards = async () => {

      const { data } = await axios
        .get("/api/notion/cards", {})
        .then((res) => res);

      const newCards = data.map((card) => ({
        cardId: card.properties.card_id.number,
        name: card.properties.name.title[0].text.content,
        url: card.properties.image_url.files[0].file.url,
      }));


      setCards(newCards);
    };

    getCards();
  }, [groupId]);

  const generatePuzzle = useCallback(() => {
    const puzzle = cards.concat(cards);
    fisherYatesShuffle(puzzle);

    return puzzle;
  }, [cards]);

  return {
    cards,
    generatePuzzle,
  };
}
