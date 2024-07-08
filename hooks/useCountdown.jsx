import { useState, useEffect, useRef } from "react";

/**
 * Custom hook for creating a countdown timer.
 *
 * @param {number} startingTime - The time in seconds to start the countdown from.
 */
const useCountdown = (startingTime) => {
  // State to hold the current time of the countdown.
  const [time, setTime] = useState(startingTime);

  // Reference to the interval timer so it can be cleared when needed.
  const timerRef = useRef(null);

  /**
   * Pauses the countdown by clearing the interval timer.
   */
  const pause = () => {
    clearInterval(timerRef.current);
  };

  // On mount, start the countdown by setting an interval that updates the time
  // every second.
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        // If the time has reached zero, stop the countdown and set the time to zero.
        if (prevTime === 0) {
          clearInterval(timerRef.current);
          return 0;
        } else {
          // Otherwise, subtract one second from the previous time and update the state.
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  return { time, pause };
};

export default useCountdown;
