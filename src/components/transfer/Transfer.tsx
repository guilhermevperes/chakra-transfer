import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Box, Button, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TransferItem from "../../types/TransferItem";
import IconButton from "../icon-button/IconButton";
import TransferBox from "../transfer-box/TransferBox";

export type Props = {
  data: TransferItem[];
  setData: React.Dispatch<React.SetStateAction<TransferItem[]>>;
  titleLeft?: string | React.ReactNode;
  titleRight?: string | React.ReactNode;
  hasSearch?: boolean;
  pagination?: string;
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
  height,
  hasSearch,
}) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [firstDisable, setFirstDisable] = useState<boolean>(false);

  const [transferButtonDisabled, setTransferButtonDisabled] =
    useState<boolean>(true);
  const [unTransferButtonDisabled, setUnTransferButtonDisabled] =
    useState<boolean>(true);
  const [transferAllButtonDisabled, setTransferAllButtonDisabled] =
    useState<boolean>(true);
  const [unTransferAllButtonDisabled, setUnTransferAllButtonDisabled] =
    useState<boolean>(true);

  useEffect(() => {
    setTransferButtonDisabled(
      !data.find((item: TransferItem) => !item.transfered && item.checked)
    );
    setUnTransferButtonDisabled(
      !data.find((item: TransferItem) => item.transfered && item.checked)
    );
    setTransferAllButtonDisabled(
      !data.find((item: TransferItem) => !item.transfered)
    );
    setUnTransferAllButtonDisabled(
      !data.find((item: TransferItem) => item.transfered)
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
      alignItems="center"
      pt="10px"
      pb="10px"
    >
      <TransferBox
        title={titleLeft}
        data={data}
        setData={setData}
        hasSearch={hasSearch}
        extraActions
        height={height}
        // isLoading
      ></TransferBox>
      <Stack spacing={4} display="flex" flexDirection="column">
        <IconButton
          Icon={ArrowRightIcon}
          onClick={() => handleTransfer(true, true)}
          boxSize={3}
          isDisabled={transferAllButtonDisabled}
        ></IconButton>
        <IconButton
          Icon={ChevronRightIcon}
          onClick={() => handleTransfer(true)}
          boxSize={6}
          isDisabled={transferButtonDisabled}
        ></IconButton>
        <IconButton
          Icon={ChevronLeftIcon}
          onClick={() => handleTransfer()}
          boxSize={6}
          isDisabled={unTransferButtonDisabled}
        ></IconButton>
        <IconButton
          Icon={ArrowLeftIcon}
          onClick={() => handleTransfer(false, true)}
          boxSize={3}
          isDisabled={unTransferAllButtonDisabled}
        ></IconButton>
      </Stack>
      <TransferBox
        title={titleRight}
        data={data}
        setData={setData}
        transfered
        hasSearch={hasSearch}
        height={height}
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
