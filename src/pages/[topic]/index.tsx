import { useMemo, useState, useEffect } from "react";
import { useRouter, NextRouter } from "next/router";
import { Image, Text, Stack, Button, IconButton } from "@chakra-ui/react";

import { Container } from "@/components/layouts/Container";
import { Hero } from "@/components/layouts/Hero";
import { Main } from "@/components/layouts/Main";
import { Footer } from "@/components/layouts/Footer";
import { PuzzleGrid, PuzzleGridItem } from "@/components/layouts/PuzzleGrid";

import { DarkModeSwitch } from "@/components/DarkModeSwitch";
import { GroupMenuButton } from "@/components/GroupMenuButton";
import { Card } from "@/components/layouts/Card";
import {
  PlayCircleIcon,
  PauseCircleIcon,
  RefreshIcon,
} from "@/components/icons";

import usePuzzle from "@/lib/useHook/usePuzzle";
import useCard from "@/lib/useHook/useCard";
import useTimer from "@/lib/useHook/useTimer";

import { DATABASE_CONFIG } from "@/lib/notion/constants";
import { DataBaseName } from "@/lib/notion/types";

const Index = () => {
  const [isGaming, setIsGaming] = useState(false);
  const [isGameStop, setIsGameStop] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const router: NextRouter = useRouter();
  let {
    query: { topic = "" } = {},
  }: { query: { topic?: DataBaseName | '' } } = router;

  const {
    puzzleGroupId,
    puzzleGroups,
    puzzle,
    puzzleSize,
    setPuzzleGroupId,
  } = usePuzzle({ topic: topic.toLowerCase() });
  const { activeCards, hitCards, isAllHit, onHitCard, resetCards } = useCard({
    puzzle,
  });
  const {
    startTimer,
    stopTimer,
    resumeTimer,
    resetTimer,
    currentTimer,
  } = useTimer();

  const startGame = () => {
    setIsGaming(true);
    setIsGameStop(false);
    startTimer();
    window.gtag("event", "start_game", {
      groupId: puzzleGroupId,
    });
  };
  const stopGame = () => {
    setIsGameStop(true);
    stopTimer();
    window.gtag("event", "stop_game", {
      groupId: puzzleGroupId,
    });
  };
  const resumeGame = () => {
    setIsGameStop(false);
    resumeTimer();
    window.gtag("event", "resume_game", {
      groupId: puzzleGroupId,
    });
  };
  const resetGame = () => {
    setIsGaming(false);
    setIsGameStop(true);
    resetTimer();
    resetCards();
    window.gtag("event", "reset_game", {
      groupId: puzzleGroupId,
    });
  };

  useEffect(() => {
    if (isAllHit) {
      stopGame();
      setIsGaming(false);
      setIsVideoModalOpen(true);
      window.gtag("event", "all_hit", {
        groupId: puzzleGroupId,
        time: currentTimer,
      });
    }
  }, [isAllHit]);

  const ResultLayout = useMemo(() => DATABASE_CONFIG[topic as DataBaseName]?.resultComponent, [
    topic,
  ]);
  const resultConfig = useMemo(() => DATABASE_CONFIG[topic as DataBaseName]?.resultConfig, [
    topic,
  ]);

  return (
    <Container height="100vh">
      <Hero>
        <Stack
          direction={["row", "column"]}
          position="fixed"
          width={["100%", "auto"]}
          pt={["toolbar.top.sm", "toolbar.top.md", "toolbar.top.lg"]}
          left={0}
          right={4}
          px={"toolbar.x"}
          justifyContent={"space-between"}
          alignItems={"flex-end"}
          spacing="1rem"
        >
          <DarkModeSwitch />
          <GroupMenuButton
            groups={puzzleGroups}
            onClick={(id) => {
              resetGame();
              setPuzzleGroupId(id);
            }}
          />
        </Stack>
        <Stack direction={"row"} spacing="1.5rem" alignItems={"center"}>
          <Text
            bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
            bgClip="text"
            fontSize={["2xl", "3xl"]}
            align={"center"}
            mt={["-0.8em", "0"]}
            ml={isGaming && !isGameStop ? "2.5em" : "0"}
            pt={["0", "1.2rem"]}
            fontWeight="600"
          >
            COME N' GET IT!
            <br />
            {currentTimer}
          </Text>
          {isGaming && !isGameStop && (
            <IconButton
              colorScheme="whiteAlpha"
              variant="ghost"
              aria-label={"Stop Game"}
              icon={<PauseCircleIcon boxSize={["1.5em", "2em"]} color="text" />}
              width={["2em", "3em"]}
              height={["2em", "3em"]}
              left={["-3.5em", "6em"]}
              style={{
                marginTop: "auto",
              }}
              onClick={stopGame}
            />
          )}
        </Stack>
      </Hero>

      <Main>
        <PuzzleGrid puzzleSize={puzzleSize}>
          {Boolean(puzzle.length) &&
            puzzle.map((card: { name: string; url: string }, i) => (
              <PuzzleGridItem key={i} onClick={() => onHitCard(i)}>
                <Card
                  bg={isGaming ? "ahgasae.alpha.500" : "gray.400"}
                  bgGradient="linear(to-tr, rgba(0, 128, 128, .8) 0%, rgba(0, 128, 128, .6) 38%, rgba(0, 128, 128, .5) 62%, rgba(0, 128, 128, .3) 92%)"
                >
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

        {(!isGaming || isGameStop) && (
          <Stack
            direction={"row"}
            position="absolute"
            width="100%"
            height="100%"
            top="0"
            left="0"
            bgColor="containerMask"
            justifyContent={"center"}
            style={{ marginTop: 0 }}
          >
            {Boolean(puzzle.length === 0) ? (
              <Button
                isLoading={true}
                loadingText="Preparing..."
                colorScheme="teal"
                variant="outline"
                margin="auto"
              >
                {"Start Game"}
              </Button>
            ) : (
              <>
                {(isGaming || !isAllHit) && (
                  <IconButton
                    colorScheme="whiteAlpha"
                    variant="ghost"
                    aria-label={
                      isAllHit || !isGaming ? "Play Game" : "Resume Game"
                    }
                    icon={<PlayCircleIcon boxSize="3em" color="text" />}
                    flex={1}
                    maxWidth="4em"
                    height="4em"
                    ml={isGaming ? "auto" : "0"}
                    mr={isGaming ? ".5rem" : "0"}
                    my={"auto"}
                    onClick={isAllHit || !isGaming ? startGame : resumeGame}
                  />
                )}
                {(isGaming || isAllHit) && (
                  <IconButton
                    colorScheme="whiteAlpha"
                    variant="ghost"
                    aria-label="Restart Game"
                    icon={<RefreshIcon boxSize="3em" color="text" />}
                    flex={1}
                    maxWidth="4em"
                    height="4em"
                    style={{
                      margin: "auto",
                      marginLeft: `${isAllHit ? "auto" : ".5rem"}`,
                    }}
                    onClick={resetGame}
                  />
                )}
              </>
            )}
          </Stack>
        )}
        {ResultLayout && (
          <ResultLayout
            isOpen={isVideoModalOpen}
            onClose={() => setIsVideoModalOpen(false)}
            {...resultConfig}
          />
        )}
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
