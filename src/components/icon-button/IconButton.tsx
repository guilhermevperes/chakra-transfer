import { Button, ComponentWithAs, IconProps } from "@chakra-ui/react";

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  Icon: ComponentWithAs<"svg", IconProps>;
  boxSize: number;
  isDisabled?: boolean;
};

const IconButton: React.FC<Props> = ({
  onClick,
  Icon,
  boxSize,
  isDisabled,
}) => {
  return (
    <Button
      shadow="md"
      onClick={onClick}
      width={42}
      height={42}
      bg="#FFFFFF"
      border="1px solid"
      borderColor="gray.400"
      borderRadius={6}
      isDisabled={isDisabled}
    >
      <Icon width={33} height={33} color="gray.400" boxSize={boxSize}></Icon>
    </Button>
  );
};

export default IconButton;
