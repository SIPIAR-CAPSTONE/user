import { useRef } from "react";

type useHistoryReturnType<T> = {
  history: Array<T>;
  record: (data: T) => void;
  clear: () => void;
};

export default function useHistory<T>(): useHistoryReturnType<T> {
  const history = useRef<Array<T>>([]);

  const record = (data: T): void => {
    history.current.push(data);
  };

  const clear = (): void => {
    history.current = [];
  };

  return { history: history.current, record, clear };
}
