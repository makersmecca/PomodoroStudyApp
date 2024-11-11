import { useState, useEffect } from "react";

const MusicPlayer = ({ selectedTrack, timerStatus }) => {
  const [audioContext, setAudioContext] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [audioSource, setAudioSource] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const trackFiles = {
    River: "/Sounds/River.mp3",
    Rain: "/Sounds/Rain.mp3",
    Library: "/Sounds/Library.mp3",
    Bonfire: "/Sounds/Bonfire.mp3",
    Binaural: "/Sounds/Binaural.mp3",
  };

  useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);

    return () => {
      if (context) {
        context.close();
      }
    };
  }, []);

  // Load and decode audio file
  useEffect(() => {
    if (!audioContext || !selectedTrack) return;

    const loadAudio = async () => {
      try {
        if (audioSource) {
          audioSource.stop();
          setAudioSource(null);
        }

        // Reset timing when changing tracks
        setPausedTime(0);
        setStartTime(0);

        const response = await fetch(trackFiles[selectedTrack]);
        const arrayBuffer = await response.arrayBuffer();
        const decodedBuffer = await audioContext.decodeAudioData(arrayBuffer);
        setAudioBuffer(decodedBuffer);
      } catch (error) {
        console.error("Error loading audio:", error);
      }
    };

    loadAudio();
  }, [selectedTrack, audioContext]);

  // Handle play/pause/stop
  useEffect(() => {
    if (!audioContext || !audioBuffer || !selectedTrack) return;

    const playSound = (offset = 0) => {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.loop = true;
      source.connect(audioContext.destination);

      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      setStartTime(audioContext.currentTime - offset);
      source.start(0, offset);
      setAudioSource(source);
      setIsPlaying(true);
    };

    const pauseSound = () => {
      if (audioSource) {
        audioSource.stop();
        setAudioSource(null);

        //Calculate time at which audio was paused
        const elapsed = audioContext.currentTime - startTime;
        setPausedTime(elapsed % audioBuffer.duration);
        setIsPlaying(false);
      }
    };

    const stopSound = () => {
      if (audioSource) {
        audioSource.stop();
        setAudioSource(null);
        setPausedTime(0);
        setStartTime(0);
        setIsPlaying(false);
      }
    };

    if (timerStatus === "play") {
      if (!isPlaying) {
        playSound(pausedTime);
      }
    } else if (timerStatus === "pause") {
      pauseSound();
    } else if (timerStatus === "stop") {
      stopSound();
    }

    return () => {
      if (audioSource) {
        audioSource.stop();
      }
    };
  }, [
    timerStatus,
    audioBuffer,
    audioContext,
    isPlaying,
    pausedTime,
    startTime,
    selectedTrack, // Add selectedTrack to dependencies
  ]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (audioSource) {
        audioSource.stop();
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  return null;
};

export default MusicPlayer;
