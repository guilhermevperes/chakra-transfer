import { useCallback, useState } from "react";

export default function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback((node: any) => {
    if (node !== null) {
      console.log(
        "node.getBoundingClientRect().height :>> ",
        node.getBoundingClientRect().height
      );
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}
