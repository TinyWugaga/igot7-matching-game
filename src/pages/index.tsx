import { useState, useEffect } from "react";

import { Grid, GridItem, Image } from "@chakra-ui/react";

import { Container } from "@/components/layouts/Container";
import { Hero } from "@/components/layouts/Hero";
import { Main } from "@/components/layouts/Main";
import { Footer } from "@/components/layouts/Footer";

import { DarkModeSwitch } from "@/components/DarkModeSwitch";
import { GroupMenuButton } from "@/components/GroupMenuButton";
import { Card } from "@/components/Card";

import usePuzzle from "@/lib/useHook/usePuzzle";

const Index = () => {
  const [groupId, setGroupId] = useState(1);
  const [activeCards, setActiveCards] = useState<number[]>([]);
  const [hitCards, setHitCards] = useState<number[]>([]);

  const [isHitting, setIsHitting] = useState(false);

  const { puzzle, puzzleSize } = usePuzzle({ groupId });

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

  useEffect(() => {
    resetGame()
  }, [puzzle]);

  const resetGame = () => {
    setActiveCards([])
    setHitCards([])
    setIsHitting(false)
  }

  return (
    <Container height="100vh">
      <Hero />

      <Main width={["100%", "100%", `${56 / (4 / (puzzleSize.col))}vw`]}>
        <Grid
          width="100%"
          height="100%"
          templateColumns={[
            `repeat(${puzzleSize.col}, 1fr)`,
            null,
            `repeat(${puzzleSize.row}, 1fr)`,
          ]}
          templateRows={[
            `repeat(${puzzleSize.row}, 1fr)`,
            null,
            `repeat(${puzzleSize.col}, 1fr)`,
          ]}
          gap={["3", "5", `${8 / ((puzzleSize.col) / 4)}`]}
        >
          {Boolean(puzzle.length) &&
            puzzle.map((card: { name: string; url: string }, i) => (
              <GridItem
                key={i}
                position="relative"
                w={["100%", null, "auto"]}
                h={["auto", null, "100%"]}
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
      <GroupMenuButton onClick={() => setGroupId(groupId + 1)} />

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
