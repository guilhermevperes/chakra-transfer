import { useEffect, useState } from "react";
import TransferItem from "../types/TransferItem";

export const useData = (
    data: TransferItem[], 
    setData: React.Dispatch<React.SetStateAction<TransferItem[]>>, 
    transfered: boolean | undefined
    ) => {

    const [dataToRender, setDataToRender] = useState<TransferItem[]>([]);
    const [renderedItems, setRenderedItems] = useState<TransferItem[]>([]);
    useEffect(() => {
        setDataToRender(data);
    
        const itemsToTransfer: TransferItem[] = dataToRender.filter(
          (item: TransferItem) => (transfered ? item.transfered : !item.transfered)
        );
    
        setRenderedItems(itemsToTransfer);
    }, [data]);

    const handleState = (e: any, item: TransferItem, i: any) => {
        const newData: TransferItem[] = [...data];
        const ids: number[] = newData.map((data) => data.id);
        const index = ids.indexOf(item.id);
        newData[index].checked = e.target.checked;
        setData(newData);
      };
    
    const filterData = (name: string) => {
      let newData: TransferItem[] = [...data];
      newData = newData.filter(
        (item: TransferItem) =>
          item.label.toLowerCase().search(name.toLowerCase()) !== -1
      );
      setDataToRender(newData);
    };

    const selectAll = (e: any) => {
      let newData: TransferItem[] = [...dataToRender];
      newData = newData.map((item: TransferItem) => {
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
      let newData: TransferItem[] = [...dataToRender];
      newData = newData.map((item: TransferItem) => {
        if (!item.disabled) {
          item.checked = !item.checked;
        }
        return item;
      });

      setDataToRender(newData);
    };

    const sort = () => {
      let newData: TransferItem[] = [...data];

      newData = newData.sort((a: TransferItem, b: TransferItem) => {
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
    return {dataToRender, renderedItems, setRenderedItems, handleState, filterData, selectAll, invertSelection, sort}
}

