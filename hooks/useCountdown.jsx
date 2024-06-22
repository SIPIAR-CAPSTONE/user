import { useState, useEffect } from "react";

const useCountdown = (startingTime) => {
  const [time, setTime] = useState(startingTime);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          return 0;
        } else return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return { time };
};

export default useCountdown;
