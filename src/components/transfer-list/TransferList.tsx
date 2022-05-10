// import { Box, Checkbox } from "@chakra-ui/react";
// import React from "react";
// import BaseData from "../../types/BaseData";

// export type Props = {
//   data: BaseData[];
//   setData: React.Dispatch<React.SetStateAction<BaseData[]>>;
//   ref: React.LegacyRef<HTMLDivElement>;
//   transfered?: boolean;
// };

// const TransferList: React.FC<Props> = ({ data, setData, transfered, ref }) => {
//   const handleState = (e: any, item: BaseData, i: any) => {
//     const newData: BaseData[] = [...data];
//     const ids: number[] = newData.map((data) => data.id);
//     const index = ids.indexOf(item.id);
//     newData[index].checked = e.target.checked;
//     setData(newData);
//   };

//   const renderItems = () => {
//     const itemsToTransfer: BaseData[] = data.filter((item: BaseData) =>
//       transfered ? item.transfered : !item.transfered
//     );
//     return itemsToTransfer.map((item: BaseData, i) => (
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
