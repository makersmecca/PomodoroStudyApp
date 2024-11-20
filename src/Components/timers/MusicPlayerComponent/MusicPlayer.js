import { useState, useEffect } from "react";

const MusicPlayer = ({ selectedTrack = "", timerStatus = "" }) => {
  const [audioContext, setAudioContext] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [audioSource, setAudioSource] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [isPageVisible, setIsPageVisible] = useState(!document.hidden);

  const trackFiles = {
    River: "/Sounds/River.mp3",
    Rain: "/Sounds/Rain.mp3",
    Library: "/Sounds/Library.mp3",
    Bonfire: "/Sounds/Bonfire.mp3",
    Binaural: "/Sounds/Binaural.mp3",
  };
  // Visibility change handler
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);

      // For iOS devices, we need to resume the AudioContext when the page becomes visible
      if (
        !document.hidden &&
        audioContext &&
        audioContext.state === "suspended"
      ) {
        audioContext.resume();
      }
    };

    // Handle page visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Special handling for iOS devices
    const isIOS =
      /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.userAgent.includes("Mac") && "ontouchend" in document);

    if (isIOS) {
      window.addEventListener("focus", () => {
        if (audioContext && audioContext.state === "suspended") {
          audioContext.resume();
        }
      });

      window.addEventListener("blur", () => {
        // Don't suspend on blur for iOS
        if (audioContext && audioSource) {
          // Keep playing
        }
      });
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [audioContext, audioSource]);

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

  // Play/Pause sounds
  useEffect(() => {
    if (!audioContext || !audioBuffer || !selectedTrack) return;

    const playSound = (offset = 0) => {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.loop = true;
      source.connect(audioContext.destination);

      // Ensure audio context is running
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      setStartTime(audioContext.currentTime - offset);
      source.start(0, offset);
      setAudioSource(source);
      setIsPlaying(true);

      // Add error handling for iOS
      source.onended = () => {
        if (!source.stopped) {
          // If the source ended unexpectedly, try to restart it
          playSound(0);
        }
      };
    };

    const pauseSound = () => {
      if (audioSource) {
        audioSource.stopped = true; // Mark as intentionally stopped
        audioSource.stop();
        setAudioSource(null);
        const elapsed = audioContext.currentTime - startTime;
        setPausedTime(elapsed % audioBuffer.duration);
        setIsPlaying(false);
      }
    };

    const stopSound = () => {
      if (audioSource) {
        audioSource.stopped = true; // Mark as intentionally stopped
        audioSource.stop();
        setAudioSource(null);
        setPausedTime(0);
        setStartTime(0);
        setIsPlaying(false);
      }
    };

    // Handle play/pause/stop based on timer status
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
        audioSource.stopped = true;
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
    selectedTrack,
    isPageVisible, // Add isPageVisible to dependencies
  ]);
  useEffect(() => {
    const initAudioContext = () => {
      if (!audioContext) {
        const context = new (window.AudioContext ||
          window.webkitAudioContext)();
        setAudioContext(context);
      }
    };

    // Initialize on user interaction
    const handleInteraction = () => {
      initAudioContext();
      // Remove listeners after first interaction
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("touchend", handleInteraction);
      document.removeEventListener("click", handleInteraction);
    };

    document.addEventListener("touchstart", handleInteraction);
    document.addEventListener("touchend", handleInteraction);
    document.addEventListener("click", handleInteraction);

    return () => {
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("touchend", handleInteraction);
      document.removeEventListener("click", handleInteraction);
    };
  }, [audioContext]);

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
