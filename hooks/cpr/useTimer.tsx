import { useEffect, useRef, useState } from "react";
import { formatTime } from "./useCpr.helper";

type Timer = {
  timerOn: boolean;
  timer: string;
  timerInSeconds: number;
  compressionTimer: number;
  startTimer: () => void;
  resetTimer: () => void;
  resetCompressionTimer: () => void;
};

export default function useTimer(): Timer {
  const [timerOn, setTimerOn] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [timer, setTimer] = useState<string>("00:00");
  const timerInSeconds = useRef(0);

  const [compressionTimer, setCompressionTimer] = useState<number>(100);
  const lastUpdateTime = useRef<number>(0);

  useEffect(() => {
    if (timerOn) {
      const startTime = Date.now();

      timerRef.current = setInterval(() => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;

        //this update the timer for every 100ms
        const formattedTime = formatTime(elapsed);
        const timeInSeconds = Math.floor(elapsed / 1000);
        timerInSeconds.current = timeInSeconds;
        setTimer(formattedTime);

        //compressionTimer or miliseconds timer for compression is used to count the time between 0.1 to 6 second
        //its purpose is to determine the time the compression attempt should be performed
        //because the compression attempt is needed to be performed every 0.6 second based on 120 compression per minute
        const delta = currentTime - lastUpdateTime.current;
        lastUpdateTime.current = currentTime;

        setCompressionTimer((prevTime) => prevTime + delta);
      }, 100);
    }

    //clean up
    else if (timerRef.current) clearInterval(timerRef.current);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerOn]);

  const resetTimer = (): void => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      setTimerOn(false);
      setTimer("00:00");
      resetCompressionTimer();
    }
  };

  const startTimer = (): void => {
    setTimerOn(true);
  };

  const resetCompressionTimer = (): void => {
    setCompressionTimer(100);
    lastUpdateTime.current = Date.now();
  };

  return {
    timer,
    timerInSeconds: timerInSeconds.current,
    timerOn,
    compressionTimer,
    resetTimer,
    startTimer,
    resetCompressionTimer,
  };
}
