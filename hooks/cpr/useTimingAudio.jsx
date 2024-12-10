import { useState, useRef, useEffect } from "react";
import { Audio } from "expo-av";
import { ToastAndroid } from "react-native";

const TimingAudio = require("../../assets/audio/CprTimingMusic.mp3");

const useTimingAudio = () => {
  const audioRef = useRef(new Audio.Sound());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAudio = async () => {
      try {
        const status = await audioRef.current.getStatusAsync();

        if (!status.isLoaded) {
          setIsLoading(true);
          await audioRef.current.loadAsync(TimingAudio);
          await audioRef.current.setIsLoopingAsync(true);
        }
      } catch (error) {
        ToastAndroid.show(
          `Error loading audio: ${error.message}`,
          ToastAndroid.SHORT
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadAudio();

    return () => {
      stopAndUnloadAudio();
    };
  }, []);

  const stopAndUnloadAudio = async () => {
    try {
      const status = await audioRef.current.getStatusAsync();
      if (status.isLoaded) {
        await audioRef.current.stopAsync();
        await audioRef.current.unloadAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      ToastAndroid.show(
        `Error during cleanup: ${error.message}`,
        ToastAndroid.SHORT
      );
    }
  };

  const playAudio = async () => {
    try {
      const status = await audioRef.current.getStatusAsync();
      if (status.isLoaded) {
        await audioRef.current.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      ToastAndroid.show(
        `Error playing audio: ${error.message}`,
        ToastAndroid.SHORT
      );
    }
  };

  const pauseAudio = async () => {
    try {
      const status = await audioRef.current.getStatusAsync();
      if (status.isLoaded) {
        await audioRef.current.replayAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      ToastAndroid.show(
        `Error pausing audio: ${error.message}`,
        ToastAndroid.SHORT
      );
    }
  };

  const stopAudio = async () => {
    try {
      const status = await audioRef.current.getStatusAsync();
      if (status.isLoaded) {
        await audioRef.current.stopAsync();
        await audioRef.current.unloadAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      ToastAndroid.show(
        `Error stopping audio: ${error.message}`,
        ToastAndroid.SHORT
      );
    }
  };

  const restartAudio = async () => {
    try {
      const status = await audioRef.current.getStatusAsync();
      if (status.isLoaded) {
        await audioRef.current.replayAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      ToastAndroid.show(
        `Error restarting audio: ${error.message}`,
        ToastAndroid.SHORT
      );
    }
  };

  return {
    isPlaying,
    isLoading,
    playAudio,
    pauseAudio,
    stopAudio,
    restartAudio,
  };
};

export default useTimingAudio;
