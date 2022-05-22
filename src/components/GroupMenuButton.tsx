import { Button, ButtonGroup } from "@chakra-ui/react";

type GroupMenuButtonProps = {
  groups: PuzzleGroup[];
  onClick: (groupId: number) => void;
};

export const GroupMenuButton = ({ groups, onClick }: GroupMenuButtonProps) => {
  return (
    <ButtonGroup
      position="relative"
      top={4}
      width="full"
      maxWidth="3xl"
      py={3}
      spacing="1rem"
    >
      {Boolean(groups.length) &&
        groups.map((group) => (
          <Button
            key={group.id}
            position="relative"
            aria-label="Next Game"
            colorScheme="green"
            onClick={() => onClick(group.id)}
          >{group.id}</Button>
        ))}
    </ButtonGroup>
  );
};
