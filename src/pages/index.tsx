import { useState, useEffect } from "react";

import { Grid, GridItem, Text, Image } from "@chakra-ui/react";

import { Container } from "@/components/layouts/Container";
import { Hero } from "@/components/layouts/Hero";
import { Main } from "@/components/layouts/Main";
import { Footer } from "@/components/layouts/Footer";

import { DarkModeSwitch } from "@/components/DarkModeSwitch";

import useCard from "@/lib/useHook/useCard";

const groupId = 1;

const Index = () => {
  const [puzzle, setPuzzle] = useState<any[]>([]);
  const [activeCards, setActiveCards] = useState<number[]>([]);
  const [hitCards, setHitCards] = useState<number[]>([]);

  const { cards, generatePuzzle } = useCard({ groupId });

  useEffect(() => {
    if (cards.length) {
      const newPuzzle = generatePuzzle();
      setPuzzle(newPuzzle);

      console.log("start Game!");
    }
  }, [cards]);

  useEffect(() => {
    // TODO: set can't hit status
    setTimeout(() => {
      if (activeCards.length === 2) {
        const isHit =
          puzzle[activeCards[0]].cardId === puzzle[activeCards[1]].cardId;
        console.log({ isHit });
  
        if(isHit) {
          setHitCards([...hitCards, ...activeCards])
        }
        setActiveCards([]);
      }
    }, 800)
  })

  const onHitCard = async (index: number) => {
    setActiveCards([...activeCards, index]);
  };

  return (
    <Container height="100vh">
      <Hero />
      <Main>
        <Grid
          templateColumns={`repeat(${puzzle.length / 3}, 1fr)`}
          templateRows="repeat(3, 1fr)"
          gap={3}
        >
          {puzzle.length &&
            puzzle.map((card: { name: string; url: string }, i) => (
              <GridItem
                key={i}
                position="relative"
                w="100%"
                h="auto"
                bg="green.500"
                cursor="pointer"
                overflow="hidden"
                onClick={() => onHitCard(i)}
              >
                <div
                  style={{
                    position: "relative",
                    height: '8rem',
                    visibility:
                      activeCards.includes(i) || hitCards.includes(i)
                        ? "visible"
                        : "hidden",
                  }}
                >
                  <Image
                    src={card.url}
                    position="absolute"
                    htmlHeight="100%"
                    objectFit="cover"
                    alt={card.name}
                  />
                </div>
              </GridItem>
            ))}
        </Grid>
      </Main>
      <DarkModeSwitch />
      <Footer>
        <Text>IGOT7 🐣 AHGASAE</Text>
      </Footer>
    </Container>
  );
};

export default Index;
