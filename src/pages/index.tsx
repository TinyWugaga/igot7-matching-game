import { Grid, GridItem, Image, Text, Button } from "@chakra-ui/react";

import { Container } from "@/components/layouts/Container";
import { Hero } from "@/components/layouts/Hero";
import { Main } from "@/components/layouts/Main";
import { Footer } from "@/components/layouts/Footer";
import { PuzzleGrid, PuzzleGridItem } from "@/components/layouts/PuzzleGrid";

import { GameMenu } from "@/components/GameMenu";
import { GroupMenuButton } from "@/components/GroupMenuButton";
import { Card } from "@/components/layouts/Card";

import usePuzzle from "@/lib/useHook/usePuzzle";
import useCard from "@/lib/useHook/useCard";
import useTimer from "@/lib/useHook/useTimer";

const Index = () => {
  const { puzzleGroups, puzzle, puzzleSize, setPuzzleGroupId } = usePuzzle();
  const { activeCards, hitCards, onHitCard } = useCard({ puzzle });
  const {
    startTimer,
    // stopTimer,
    // resumeTimer,
    // resetTimer,
    currentTimer,
  } = useTimer();

  return (
    <Container height="100vh">
      <Hero>
        <GroupMenuButton
          groups={puzzleGroups}
          onClick={(id) => setPuzzleGroupId(id)}
        />
        <Button
          isLoading={Boolean(puzzle.length === 0)}
          loadingText="Preparing"
          colorScheme="teal"
          variant="outline"
          onClick={startTimer}
        >
          Start Game
        </Button>
        <Text>{currentTimer}</Text>
      </Hero>

      <Main>
        <PuzzleGrid puzzleSize={puzzleSize}>
          {Boolean(puzzle.length) &&
            puzzle.map((card: { name: string; url: string }, i) => (
              <PuzzleGridItem key={i} onClick={() => onHitCard(i)}>
                <Card>
                  <Image
                    position="absolute"
                    height="100%"
                    objectFit="cover"
                    src={card.url}
                    alt={card.name}
                    style={{
                      visibility:
                        activeCards.includes(i) || hitCards.includes(i)
                          ? "visible"
                          : "hidden",
                    }}
                  />
                </Card>
              </PuzzleGridItem>
            ))}
        </PuzzleGrid>
        <GameMenu />
      </Main>

      <Footer>
        <Image
          width="12%"
          height="100%"
          objectFit="contain"
          src="assets/TINYWXCVIII_3D.PNG"
        />
        <Text
          width="88%"
          height="100%"
          pt={["0", null, "0.5em"]}
          color="gray.600"
          fontSize={[".7em", null, ".9em"]}
          lineHeight="1.2"
          whiteSpace="pre-line"
        >
          Made by TINYWXCVIII.
          <br />
          COPYRIGHT © 2022 WARNER MUSIC KOREA. All Images Rights Reserved.
        </Text>
      </Footer>
    </Container>
  );
};

export default Index;

// IGOT7 🐣 AHGASAE
