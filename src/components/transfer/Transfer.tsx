import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import BaseData from "../../types/BaseData";
import TransferBox from "../transfer-box/TransferBox";

export type Props = {
  data: BaseData[];
  setData: React.Dispatch<React.SetStateAction<BaseData[]>>;
  title1: string;
  title2: string;
  maxW: string;
};

const Transfer: React.FC<Props> = ({ data, setData, title1, title2, maxW }) => {
  const handleTransfer = (transfer?: boolean, all?: boolean) => {
    let newData: BaseData[] = [...data];
    newData = newData.map((item: BaseData, i) => {
      if (all) {
        if (transfer) {
          item.transfered = true;
        }
        if (!transfer) {
          item.transfered = false;
        }
      } else {
        if (item.checked && transfer) {
          item.transfered = true;
        }
        if (item.checked && !transfer) {
          item.transfered = false;
        }
        if (!item.checked) {
          item.checked = false;
        }
      }

      return item;
    });
    setData(newData);
  };

  return (
    <Box
      d="flex"
      justifyContent="space-around"
      minWidth="600px"
      h="400px"
      border="1px solid black"
      alignItems="center"
      pt="10px"
      pb="10px"
      maxW={maxW}
    >
      <TransferBox
        title={title1}
        data={data}
        setData={setData}
        filter
      ></TransferBox>
      <Box display="flex" flexDirection="column">
        <Button m="6px" onClick={() => handleTransfer(true, true)}>
          <ArrowRightIcon></ArrowRightIcon>
        </Button>
        <Button m="6px" onClick={() => handleTransfer(true)}>
          <ChevronRightIcon></ChevronRightIcon>
        </Button>
        <Button m="6px" onClick={() => handleTransfer()}>
          <ChevronLeftIcon></ChevronLeftIcon>
        </Button>
        <Button m="6px" onClick={() => handleTransfer(false, true)}>
          <ArrowLeftIcon></ArrowLeftIcon>
        </Button>
      </Box>
      <TransferBox
        title={title2}
        data={data}
        setData={setData}
        transfered
        filter
      ></TransferBox>
    </Box>
  );
};

export default Transfer;
