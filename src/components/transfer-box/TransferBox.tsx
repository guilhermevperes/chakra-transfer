import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useData } from "../../hooks/useData";
import TransferItem from "../../types/TransferItem";

export type Props = {
  title: string | React.ReactNode;
  data: TransferItem[];
  setData: React.Dispatch<React.SetStateAction<TransferItem[]>>;
  transfered?: boolean;
  hasSearch?: boolean;
  paginated?: boolean;
  extraActions?: boolean;
  isLoading?: boolean;
  height?: number;
};

const TransferBox: React.FC<Props> = ({
  title,
  data,
  setData,
  transfered,
  hasSearch,
  paginated,
  extraActions,
  isLoading,
  height,
}) => {
  const {
    dataToRender,
    renderedItems,
    handleState,
    filterData,
    selectAll,
    invertSelection,
    sort,
  } = useData(data, setData, transfered);

  const renderItems = () => {
    const itemsToTransfer: TransferItem[] = dataToRender.filter(
      (item: TransferItem) => (transfered ? item.transfered : !item.transfered)
    );

    return itemsToTransfer.map((item: TransferItem, i) => (
      <Box
        key={i}
        // ref={getItemRef}
        w="100%"
        padding="12px"
        border="1px solid"
        borderColor="gray.400"
        borderRadius={6}
        _hover={{ bg: "gray.100" }}
      >
        <Checkbox
          defaultIsChecked={item.checked}
          isChecked={item.checked}
          onChange={(e) => handleState(e, item, i)}
          disabled={item.disabled}
          w="100%"
          color="gray.800"
        >
          {item.label}
        </Checkbox>
      </Box>
    ));
  };

  const renderSkeleton = () => {
    return (
      <Stack w="100%">
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  };

  const renderInput = () => {
    return (
      <InputGroup h="32px">
        <InputLeftElement
          h="32px"
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          h="32px"
          placeholder="Search"
          onChange={(e) => filterData(e.target.value)}
        ></Input>
      </InputGroup>
    );
  };

  const renderExtraOptions = () => {
    return (
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Actions
        </MenuButton>
        <MenuList>
          <Button onClick={invertSelection}>Invert selection</Button>
          <Button onClick={sort}>Sort</Button>
        </MenuList>
      </Menu>
    );
  };

  return (
    <Box
      d="flex"
      w="320px"
      border="1px solid"
      display="flex"
      flexDirection="column"
      alignItems="center"
      minH="320px"
      borderRadius="4px"
      borderColor="gray.300"
      h={height ? height : "auto"}
    >
      <Box
        display="flex"
        w="100%"
        h="46px"
        borderBottom="1px solid"
        paddingLeft="30px"
        paddingRight="30px"
        borderBottomColor="gray.300"
        alignItems="center"
        position="relative"
        justifyContent="center"
      >
        <Checkbox
          onChange={selectAll}
          position="absolute"
          top="15px"
          left="16px"
        />
        {title && (
          <Text fontSize="20px" color="gray.400">
            {title}
          </Text>
        )}
      </Box>

      <Stack spacing={6} h="80%" w="100%" padding="10px">
        {hasSearch && renderInput()}
        {/* {extraActions && renderExtraOptions()} */}
        <Stack
          // overflowY="auto"
          w="100%"
          h="100%"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          // ref={getListRef}
          overflow={height ? "auto" : "visible"}
        >
          {isLoading ? (
            renderSkeleton()
          ) : renderedItems.length > 0 ? (
            renderItems()
          ) : (
            <Text>Empty State</Text>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default TransferBox;

//PAGINATED LOGIC

// const getListRef = (element: HTMLDivElement) => {
//   setListHeight(element?.getBoundingClientRect().height);
// };

// const getItemRef = (element: HTMLDivElement) => {
//   setItemHeigh(element?.getBoundingClientRect().height);
// };

// const [listHeight, setListHeight] = useState<number>(0);
// const [itemHeight, setItemHeigh] = useState<number>(0);

// const [currentPage, setCurrentPage] = useState<number>(1);
// const [totalPages, setTotalPages] = useState<number>(1);
// useEffect(() => {
//   if (paginated && itemHeight > 0) {
//     setAllDataToRender(dataToRender);
//     let newData: TransferItem[] = dataToRender.filter((item: TransferItem) =>
//       transfered ? item.transfered : !item.transfered
//     );
//     setTotalPages(
//       Math.ceil(newData.length / (Math.floor(listHeight / itemHeight) - 1))
//     );

//     newData = newData.splice(0, Math.floor(listHeight / itemHeight) - 1);
//     setDataToRender(newData);
//     console.log("listHeight :>> ", Math.floor(listHeight / itemHeight) - 1);
//   }
// }, [listHeight, currentPage]);

{
  /* </Box> */
}
{
  /* {paginated && (
        <Box>
        <ChevronLeftIcon
        onClick={() => setCurrentPage(currentPage - 1)}
        cursor="pointer"
        ></ChevronLeftIcon>
        {currentPage}/{totalPages}
        <ChevronRightIcon
        onClick={() => setCurrentPage(currentPage + 1)}
        cursor="pointer"
        ></ChevronRightIcon>
        </Box>
      )} */
}
