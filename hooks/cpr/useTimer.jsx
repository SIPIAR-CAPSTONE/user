import { useEffect, useMemo, useRef, useState } from "react";

export default function useTimer() {
  const [timerOn, setTimerOn] = useState(false);
  const timerRef = useRef(null);
  const [rawTimer, setRawTimer] = useState(0);
  const timer = useMemo(() => formatTime(rawTimer), [rawTimer]);
  const timerInSeconds = useMemo(() => rawTimer / 1000, [rawTimer]);
  useEffect(() => {
    if (timerOn) {
      const startTime = Date.now();

      timerRef.current = setInterval(() => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        setRawTimer(elapsed);
      }, 100);
    }

    //clean up
    else if (timerRef.current) clearInterval(timerRef.current);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerOn]);

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      setTimerOn(false);
      setRawTimer(0);
    }
  };

  const startTimer = () => {
    setTimerOn(true);
  };

  return { timer, timerInSeconds, timerOn, resetTimer, startTimer };
}

const formatTime = (time) => {
  const totalSeconds = Math.floor(time / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedTime = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;

  return formattedTime;
};
