import { useEffect, useState } from "react";
import { getItem, setItem } from "../utils/LocalStorage";

export default function useFirstTimePopup({
  key,
  handleTrue = () => {},
  handleFalse = () => {},
  delay = 0,
}) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      checkKey();
    }, delay);
  }, []);

  const checkKey = async () => {
    const value = await getItem(key);
    if (value === null) {
      setDone(false);
      handleFalse();
    } else {
      setDone(true);
      handleTrue();
    }
  };

  const markAsDone = () => {
    setDone(true);
    setItem(key, "true");
  };

  return { done, markAsDone };
}
