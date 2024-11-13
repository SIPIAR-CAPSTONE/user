import { useEffect, useRef } from "react";
import { ToastAndroid } from "react-native";
import { Audio } from "expo-av";

const PushAudio = require("../../assets/audio/push.mp3")
const PushFasterAudio =
  require("../../assets/audio/pushFaster.mp3")
const PushHarderAudio =
  require("../../assets/audio/pushHarder.mp3")
const PushSoftlyAudio =
  require("../../assets/audio/pushSoftly.mp3")
const pushSlowlyAudio =
  require("../../assets/audio/pushSlowly.mp3")

const useAudioCue = () => {
  const soundsRef = useRef({
    push: new Audio.Sound(),
    pushFaster: new Audio.Sound(),
    pushHarder: new Audio.Sound(),
    pushSoftly: new Audio.Sound(),
    pushSlowly: new Audio.Sound(),
  });

  // Preload all sounds
  useEffect(() => {
    const preloadAudio = async () => {
      try {
        const soundFiles = [
          { name: "push", file: PushAudio },
          { name: "pushFaster", file: PushFasterAudio },
          { name: "pushHarder", file: PushHarderAudio },
          { name: "pushSoftly", file: PushSoftlyAudio },
          { name: "pushSlowly", file: pushSlowlyAudio },
        ];

        for (const { name, file } of soundFiles) {
          await soundsRef.current[name].loadAsync(file);
          await soundsRef.current[name].setStatusAsync({ shouldPlay: false });
        }
      } catch (error) {
        ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
      }
    };

    preloadAudio();

    return () => {
      // Unload all sounds when the component is unmounted
      for (const key in soundsRef.current) {
        soundsRef.current[key].unloadAsync();
      }
    };
  }, []);

  const playAudioCue = async (compressionScore) => {
    const { depthScore, timingScore } = compressionScore;
    let audioClip = "push";

    if (depthScore === "Perfect" && timingScore === "Perfect") {
      audioClip = "push";
    } else if (depthScore === "Too Shallow") {
      audioClip = "pushHarder";
    } else if (depthScore === "Too Deep") {
      audioClip = "pushSoftly";
    } else if (timingScore === "Too Early") {
      audioClip = "pushSlowly";
    } else if (timingScore === "Missed") {
      audioClip = "pushFaster";
    } else {
      audioClip = "push";
    }

    try {
      const sound = soundsRef.current[audioClip];
      if (sound) {
        await sound.replayAsync();
      } else {
        ToastAndroid.show(`Sound not found: ${audioClip}`, ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
    }
  };

  return { playAudioCue };
};

export default useAudioCue;
