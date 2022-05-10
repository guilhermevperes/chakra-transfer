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
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import BaseData from "../../types/BaseData";

export type Props = {
  title: string;
  data: BaseData[];
  setData: React.Dispatch<React.SetStateAction<BaseData[]>>;
  transfered?: boolean;
  filter?: boolean;
  paginated?: boolean;
  extraActions?: boolean;
};

const TransferBox: React.FC<Props> = ({
  title,
  data,
  setData,
  transfered,
  filter,
  paginated,
  extraActions,
}) => {
  const [dataToRender, setDataToRender] = useState<BaseData[]>([]);
  const [renderedItems, setRenderedItems] = useState<BaseData[]>([]);

  useEffect(() => {
    setDataToRender(data);

    const itemsToTransfer: BaseData[] = dataToRender.filter((item: BaseData) =>
      transfered ? item.transfered : !item.transfered
    );

    setRenderedItems(itemsToTransfer);
  }, [data]);

  const handleState = (e: any, item: BaseData, i: any) => {
    const newData: BaseData[] = [...data];
    const ids: number[] = newData.map((data) => data.id);
    const index = ids.indexOf(item.id);
    newData[index].checked = e.target.checked;
    setData(newData);
  };

  const renderItems = () => {
    const itemsToTransfer: BaseData[] = dataToRender.filter((item: BaseData) =>
      transfered ? item.transfered : !item.transfered
    );

    return itemsToTransfer.map((item: BaseData, i) => (
      <Box
        key={i}
        // ref={getItemRef}
      >
        <Checkbox
          defaultIsChecked={item.checked}
          isChecked={item.checked}
          onChange={(e) => handleState(e, item, i)}
          disabled={item.disabled}
        >
          {item.label}
        </Checkbox>
      </Box>
    ));
  };

  const filterData = (name: string) => {
    let newData: BaseData[] = [...data];
    newData = newData.filter(
      (item: BaseData) =>
        item.label.toLowerCase().search(name.toLowerCase()) !== -1
    );
    setDataToRender(newData);
  };

  const selectAll = (e: any) => {
    let newData: BaseData[] = [...dataToRender];
    newData = newData.map((item: BaseData) => {
      if (!item.disabled) {
        if (transfered && item.transfered) {
          item.checked = e.target.checked;
        }
        if (!transfered && !item.transfered) {
          item.checked = e.target.checked;
        }
      }
      return item;
    });
    setDataToRender(newData);
  };

  const invertSelection = () => {
    let newData: BaseData[] = [...dataToRender];
    newData = newData.map((item: BaseData) => {
      if (!item.disabled) {
        item.checked = !item.checked;
      }
      return item;
    });

    setDataToRender(newData);
  };

  const sort = () => {
    let newData: BaseData[] = [...data];

    newData = newData.sort((a: BaseData, b: BaseData) => {
      if (a.label < b.label) {
        return -1;
      }
      if (a.label > b.label) {
        return 1;
      }
      return 0;
    });

    setDataToRender(newData);
  };

  const renderInput = () => {
    return (
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
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
      minWidth="90px"
      border="1px solid black"
      display="flex"
      flexDirection="column"
      alignItems="center"
      h="100%"
      overflow="hidden"
      flex="0.4"
    >
      <Box
        d="flex"
        border="1px solid black"
        display="flex"
        flexDirection="column"
        alignItems="center"
        h="100%"
        p="4px"
        overflow="hidden"
      >
        {title && <Text>{title}</Text>}
        <Box
          w="100%"
          h="100%"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          p="6px"
        >
          <Stack spacing={3} overflow="hidden" height="100%">
            <Checkbox onChange={selectAll}>Select All</Checkbox>
            {filter && renderInput()}
            {extraActions && renderExtraOptions()}
            <Box
              overflowY="auto"
              w="100%"
              h="100%"
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              // ref={getListRef}
            >
              {renderedItems.length > 0 ? (
                renderItems()
              ) : (
                <Text>Empty State</Text>
              )}
            </Box>
          </Stack>
        </Box>
      </Box>
      {/* {paginated && (
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
      )} */}
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
//     let newData: BaseData[] = dataToRender.filter((item: BaseData) =>
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
