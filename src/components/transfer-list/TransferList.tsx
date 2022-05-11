// import { Box, Checkbox } from "@chakra-ui/react";
// import React from "react";
// import TransferItem from "../../types/TransferItem";

// export type Props = {
//   data: TransferItem[];
//   setData: React.Dispatch<React.SetStateAction<TransferItem[]>>;
//   ref: React.LegacyRef<HTMLDivElement>;
//   transfered?: boolean;
// };

// const TransferList: React.FC<Props> = ({ data, setData, transfered, ref }) => {
//   const handleState = (e: any, item: TransferItem, i: any) => {
//     const newData: TransferItem[] = [...data];
//     const ids: number[] = newData.map((data) => data.id);
//     const index = ids.indexOf(item.id);
//     newData[index].checked = e.target.checked;
//     setData(newData);
//   };

//   const renderItems = () => {
//     const itemsToTransfer: TransferItem[] = data.filter((item: TransferItem) =>
//       transfered ? item.transfered : !item.transfered
//     );
//     return itemsToTransfer.map((item: TransferItem, i) => (
//       <Box key={i}>
//         <Checkbox
//           defaultIsChecked={item.checked}
//           isChecked={item.checked}
//           onChange={(e) => handleState(e, item, i)}
//           disabled={item.disabled}
//         >
//           {item.label}
//         </Checkbox>
//       </Box>
//     ));
//   };

//   return (
//     <Box
//       overflowY="auto"
//       w="100%"
//       h="100%"
//       display="flex"
//       flexDirection="column"
//       alignItems="flex-start"
//       ref={ref}
//     >
//       {renderItems()}
//     </Box>
//   );
// };

// const TransferListRef = React.forwardRef<HTMLButtonElement, Props>(
//   ({ data, setData, transfered, ref }) => (
//     <TransferListRef
//       data={data}
//       setData={setData}
//       transfered={transfered}
//       ref={ref}
//     ></TransferListRef>
//   )
// );
