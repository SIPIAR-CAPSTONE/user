import { useEffect, useMemo, useRef, useState } from "react";
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
  const [rawTimer, setRawTimer] = useState<number>(0);
  const timer = useMemo(() => formatTime(rawTimer), [rawTimer]);
  const timerInSeconds = useMemo(() => Math.floor(rawTimer / 1000), [rawTimer]);

  const compressionTimer = useRef(100);
  const lastUpdateTime = useRef<number>(0);

  useEffect(() => {
    if (timerOn) {
      const startTime = Date.now();
      lastUpdateTime.current = startTime;

      timerRef.current = setInterval(() => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        setRawTimer(elapsed);

        //compressionTimer served as a counter for the time between 0.1 to 6 second based on 120 compression per minute
        //compressionTimer will be the basis for when audio cue will be played and when to get compressionScore
        const delta = currentTime - lastUpdateTime.current;
        lastUpdateTime.current = currentTime;

        compressionTimer.current = compressionTimer.current + delta;
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
      setRawTimer(0);
      resetCompressionTimer();
    }
  };

  const startTimer = (): void => {
    setTimerOn(true);
  };

  const resetCompressionTimer = (): void => {
    compressionTimer.current = 100;
    lastUpdateTime.current = Date.now();
  };

  return {
    timer,
    timerInSeconds,
    timerOn,
    compressionTimer: compressionTimer.current,
    resetTimer,
    startTimer,
    resetCompressionTimer,
  };
}
