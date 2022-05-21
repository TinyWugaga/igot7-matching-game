import axios from "axios";
import { useState, useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from "next";

import { Grid, GridItem, Image } from "@chakra-ui/react";

import { Container } from "@/components/layouts/Container";
import { Hero } from "@/components/layouts/Hero";
import { Main } from "@/components/layouts/Main";
import { Footer } from "@/components/layouts/Footer";

import { DarkModeSwitch } from "@/components/DarkModeSwitch";
import { Card } from "@/components/Card";

import { fetchCards, countPuzzleSize } from "@/lib/useHook/usePuzzle";
import { DATABASE_NAME } from "@/lib/notion/constants";

type GameAppProps = {
  errors?: string
}

const GameApp = ({ puzzle, puzzleSize, errors }: PuzzleProps & GameAppProps) => {
  if(errors) {
    return (
      <div>{errors}</div>
    )
  }

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

  return (
    <Container height="100vh">
      <Hero />
      <Main width={["100%", "100%", `${56 / (4 / puzzleSize.col)}vw`]}>
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
          gap={["3", "5", `${8 / (puzzleSize.col / 4)}`]}
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

export default GameApp;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data: groupData } = await axios.get(
      `/api/notion/${DATABASE_NAME.GROUPS}`
    );

    // Get the paths we want to pre-render based on users
    const paths = groupData.map((data: any) => ({
      params: { id: data.properties.id.title[0].text.content },
    }));

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false };
  } catch (err:any) {
    console.log({ err })
    return { paths: [{ params: { id: 1 }}], fallback: false };
  }
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = (params?.id || "1").toString();
    const puzzle = await fetchCards(id);
    const puzzleSize = countPuzzleSize(puzzle.length);

    return { props: { puzzle, puzzleSize } };
  } catch (err:any) {
    console.log({ err })
    return { props: { errors: err.message } };
  }
};
