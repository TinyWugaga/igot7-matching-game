import { useState, useEffect } from "react";

import { Grid, GridItem, Image } from "@chakra-ui/react";

import { Container } from "@/components/layouts/Container";
import { Hero } from "@/components/layouts/Hero";
import { Main } from "@/components/layouts/Main";
import { Footer } from "@/components/layouts/Footer";

import { DarkModeSwitch } from "@/components/DarkModeSwitch";
import { Card } from "@/components/Card";

import useCard from "@/lib/useHook/useCard";

const groupId = 1;

const Index = () => {
  const [puzzle, setPuzzle] = useState<any[]>([]);

  const [activeCards, setActiveCards] = useState<number[]>([]);
  const [hitCards, setHitCards] = useState<number[]>([]);

  const [isHitting, setIsHitting] = useState(false);

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

  return (
    <Container height="100vh">
      <Hero />
      <Main>
        <Grid
          width="100%"
          height="100%"
          templateColumns={[
            `repeat(${puzzle.length / 6}, 1fr)`,
            null,
            `repeat(${puzzle.length / 3}, 1fr)`,
          ]}
          templateRows={["repeat(6, 1fr)", null, "repeat(3, 1fr)"]}
          gap={["3", "5", "6"]}
        >
          {Boolean(puzzle.length) &&
            puzzle.map((card: { name: string; url: string }, i) => (
              <GridItem
                key={i}
                position="relative"
                w="100%"
                h="auto"
                rounded="lg"
                cursor="pointer"
                overflow="hidden"
                boxShadow="base"
                _hover={{
                  boxShadow: "md",
                }}
                onClick={() => onHitCard(i)}
              >
                <Card>
                  <Image
                    src={card.url}
                    position="absolute"
                    height="100%"
                    objectFit="cover"
                    alt={card.name}
                    style={{
                      visibility:
                        activeCards.includes(i) || hitCards.includes(i)
                          ? "visible"
                          : "hidden",
                    }}
                  />
                </Card>
              </GridItem>
            ))}
        </Grid>
      </Main>
      <DarkModeSwitch />
      <Footer>
        <Image
          width="auto"
          height="100%"
          objectFit="contain"
          src="assets/tiny_logo_text.svg"
        />
      </Footer>
    </Container>
  );
};

export default Index;

// IGOT7 🐣 AHGASAE
