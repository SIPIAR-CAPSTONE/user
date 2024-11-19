import { useRef } from "react";


export default function useHistory() {
  const history = useRef([]);


  const record = (data) => {
    history.current.push(data);
  };

  const clear = () => {
    history.current = [];
  };

  return { history: history.current, record, clear };
}
