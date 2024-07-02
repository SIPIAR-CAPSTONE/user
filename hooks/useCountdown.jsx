import { useState, useEffect, useRef } from "react";

const useCountdown = (startingTime) => {
  const [time, setTime] = useState(startingTime);
  const timerRef = useRef(null);

  //! set timer to null
  const pause = () => {
    clearInterval(timerRef.current);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerRef.current);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  return { time, pause };
};

export default useCountdown;
