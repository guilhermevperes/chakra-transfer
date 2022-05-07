import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Checkbox,
  Input,
  InputGroup,
  InputLeftElement,
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
};

const TransferBox: React.FC<Props> = ({
  title,
  data,
  setData,
  transfered,
  filter,
}) => {
  const [dataToRender, setDataToRender] = useState<BaseData[]>([]);

  useEffect(() => {
    setDataToRender(data);
  }, []);

  const handleState = (e: any, item: BaseData, i: any) => {
    const newData: BaseData[] = [...data];
    const ids: number[] = newData.map((data) => data.id);
    const index = ids.indexOf(item.id);
    newData[index].selected = e.target.checked;
    setData(newData);
  };

  const handleItems = () => {
    const itemsToTransfer: BaseData[] = dataToRender.filter((item: BaseData) =>
      transfered ? item.transfered : !item.transfered
    );
    return itemsToTransfer.map((item: BaseData, i) => (
      <Box key={i}>
        <Checkbox
          defaultIsChecked={item.selected}
          isChecked={item.selected}
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

  return (
    <Box
      d="flex"
      minWidth="90px"
      flex="0.4"
      border="1px solid black"
      display="flex"
      flexDirection="column"
      alignItems="center"
      h="100%"
      p="4px"
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
        <Stack spacing={3}>
          {filter && renderInput()}
          {handleItems()}
        </Stack>
      </Box>
    </Box>
  );
};

export default TransferBox;
