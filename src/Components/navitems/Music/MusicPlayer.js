// MusicPlayer.js
import { Howl } from "howler";

class MusicPlayer {
  constructor() {
    this.sound = null;
    this.isPlaying = false;
    this.currentTrackId = null;

    this.tracks = {
      nature: new Howl({
        src: ["/path/to/nature.mp3"],
        loop: true,
        volume: 0.5,
      }),
      rain: new Howl({
        src: ["/path/to/rain.mp3"],
        loop: true,
        volume: 0.5,
      }),
      cafe: new Howl({
        src: ["/path/to/cafe.mp3"],
        loop: true,
        volume: 0.5,
      }),
      whitenoise: new Howl({
        src: ["/path/to/whitenoise.mp3"],
        loop: true,
        volume: 0.5,
      }),
    };
  }

  play(trackId) {
    if (this.sound && this.isPlaying) {
      this.stop();
    }

    if (this.tracks[trackId]) {
      this.sound = this.tracks[trackId];
      this.sound.play();
      this.isPlaying = true;
      this.currentTrackId = trackId;
    }
  }

  pause() {
    if (this.sound && this.isPlaying) {
      this.sound.pause();
      this.isPlaying = false;
    }
  }

  resume() {
    if (this.sound && !this.isPlaying && this.currentTrackId) {
      this.sound.play();
      this.isPlaying = true;
    }
  }

  stop() {
    if (this.sound) {
      this.sound.stop();
      this.isPlaying = false;
      this.currentTrackId = null;
    }
  }

  setVolume(value) {
    if (this.sound) {
      this.sound.volume(value);
    }
  }

  getCurrentTrack() {
    return this.currentTrackId;
  }

  getIsPlaying() {
    return this.isPlaying;
  }
}

export const musicPlayer = new MusicPlayer();
