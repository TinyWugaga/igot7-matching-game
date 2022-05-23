import { Icon, IconProps } from "@chakra-ui/react";

export function PlayCircleIcon(props:IconProps) {
  return (
    <Icon viewBox="0 0 24 24" color="#292929" {...props}>
      <path fill='currentColor' d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm-2.5-3.5l7-4.5l-7-4.5v9z"></path>
    </Icon>
  );
}
