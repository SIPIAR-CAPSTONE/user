import { useRef } from "react";

export default function useHistory() {
  const history = useRef({
    data: [],
    duration: "00:00",
  });

  const record = (data) => {
    if (data?.overall) {
      history.current.data.push(data);
    }
  };

  const clear = () => {
    history.current = [];
  };

  const setDuration = (duration) => {
    history.current.duration = duration;
  };

  return { history: history.current, record, clear, setDuration };
}
