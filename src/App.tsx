import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Transfer from "./components/transfer/Transfer";
import BaseData from "./types/BaseData";

export type Props = {};

const App: React.FC<Props> = ({}) => {
  const [data, setData] = useState<BaseData[]>([
    {
      id: 1,
      label: "Chocolate",
      value: "chocolate",
      disabled: true,
    },
    {
      id: 2,
      label: "Banana",
      value: "banana",
    },
    {
      id: 3,
      label: "Egg",
      value: "egg",
      transfered: true,
    },
    {
      id: 4,
      label: "Blueberry",
      value: "blueberry",
      transfered: true,
    },
    {
      id: 5,
      label: "Apple",
      value: "apple",
      transfered: false,
    },
    {
      id: 6,
      label: "Pancake",
      value: "pancake",
      transfered: false,
      disabled: true,
    },
    {
      id: 7,
      label: "Hanburger",
      value: "hanburger",
      transfered: false,
    },
    {
      id: 7,
      label: "Tomato",
      value: "tomato",
      transfered: false,
    },
    {
      id: 8,
      label: "Tomato",
      value: "tomato",
      transfered: false,
    },
    {
      id: 9,
      label: "Salad",
      value: "salad",
      transfered: false,
    },
    {
      id: 10,
      label: "Rice",
      value: "rice",
      transfered: false,
    },
    {
      id: 11,
      label: "Beans",
      value: "beans",
      transfered: false,
    },
    {
      id: 11,
      label: "Beans",
      value: "beans",
      transfered: false,
    },
    {
      id: 11,
      label: "Beans",
      value: "beans",
      transfered: false,
    },
    {
      id: 11,
      label: "Beans",
      value: "beans",
      transfered: false,
    },
  ]);

  useEffect(() => {
    console.log("data :>> ", data);
  }, [data]);

  return (
    <Transfer
      data={data}
      setData={setData}
      title1="Não selecionado"
      title2="Selecionado"
      maxW="800px"
    ></Transfer>
  );
};

export default App;
