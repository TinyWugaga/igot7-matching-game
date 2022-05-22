import { Grid, GridItem, GridProps, GridItemProps } from "@chakra-ui/react";

type PuzzleGridProps = {
  puzzleSize: PuzzleSize
}
export const PuzzleGrid = ({
  puzzleSize,
  ...props
}: PuzzleGridProps & GridProps) => {
  return (
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
      gap={["3", "4", `${Math.floor(5 / (puzzleSize.col / 4))}`]}
      px={["0", ".6rem", `${Math.round((10 / puzzleSize.col), 2)}rem`]}
      {...props}
    />
  );
};

export const PuzzleGridItem = (props: GridItemProps) => {
  return (
    <GridItem
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
      {...props}
    />
  );
};
