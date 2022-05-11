import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Box, Button, Switch, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TransferItem from "../../types/TransferItem";
import TransferBox from "../transfer-box/TransferBox";

export type Props = {
  data: TransferItem[];
  setData: React.Dispatch<React.SetStateAction<TransferItem[]>>;
  titleLeft?: string | React.ReactNode;
  titleRight?: string | React.ReactNode;
  hasSearch?: boolean;
  hasPagination?: {
    pageSize: number;
  };
  hasDraggable?: boolean;
  hasSelectAll?: boolean;
  hasEditItem?: boolean;
  hasNewItem?: boolean;
  hasDeleteItem?: boolean;
  colorMode?: "light" | "dark";
  hasActions?: {
    sort: boolean;
    invertSelection: boolean;
    selectAll: boolean;
  };
  colorScheme?: string;
  hasUndo?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  height?: number;
  hasCollapsable?: boolean;
  isLoading?: boolean;
  language?: string;
  emptyMessage?: string | React.ReactNode;
};

const Transfer: React.FC<Props> = ({
  data,
  setData,
  titleLeft,
  titleRight,
}) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [firstDisable, setFirstDisable] = useState<boolean>(false);

  const [transferButtonDisabled, setTransferButtonDisabled] =
    useState<boolean>(true);
  const [unTransferButtonDisabled, setUnTransferButtonDisabled] =
    useState<boolean>(true);

  useEffect(() => {
    setTransferButtonDisabled(
      !data.find((item: TransferItem) => !item.transfered && item.checked)
    );
    setUnTransferButtonDisabled(
      !data.find((item: TransferItem) => item.transfered && item.checked)
    );
  }, [data]);

  useEffect(() => {
    let newData: TransferItem[] = [...data];
    if (firstDisable) {
      newData = newData.map((item: TransferItem) => {
        item.disabled = disabled;

        return item;
      });
    }
    setData(newData);
  }, [disabled]);

  const handleTransfer = (transfer?: boolean, all?: boolean) => {
    let newData: TransferItem[] = [...data];
    newData = newData.map((item: TransferItem, i) => {
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
      h="auto"
      alignItems="flex-start"
      pt="10px"
      pb="10px"
    >
      <TransferBox
        title={titleLeft}
        data={data}
        setData={setData}
        filter
        extraActions
        // isLoading
      ></TransferBox>
      <Box display="flex" flexDirection="column">
        <Button m="6px" onClick={() => handleTransfer(true, true)}>
          <ArrowRightIcon></ArrowRightIcon>
        </Button>
        <Button
          m="6px"
          onClick={() => handleTransfer(true)}
          isDisabled={transferButtonDisabled}
        >
          <ChevronRightIcon></ChevronRightIcon>
        </Button>
        <Button
          m="6px"
          onClick={() => handleTransfer()}
          isDisabled={unTransferButtonDisabled}
        >
          <ChevronLeftIcon></ChevronLeftIcon>
        </Button>
        <Button m="6px" onClick={() => handleTransfer(false, true)}>
          <ArrowLeftIcon></ArrowLeftIcon>
        </Button>
      </Box>
      <TransferBox
        title={titleRight}
        data={data}
        setData={setData}
        transfered
        filter
      ></TransferBox>
      {/* <Box>
        <Text>Disabled all</Text>
        <Switch
          id="email-alerts"
          onChange={() => {
            setDisabled(!disabled);
            setFirstDisable(true);
          }}
        />
      </Box> */}
    </Box>
  );
};

export default Transfer;
