// MusicPlayer.js
import { Howl } from "howler";

class MusicPlayer {
  constructor() {
    this.sound = null;
    this.isPlaying = false;
    this.currentTrackId = null;

    this.tracks = {
      river: new Howl({
        src: ["./Sounds/River.mp3"],
        loop: true,
        volume: 0.5,
      }),
      rain: new Howl({
        src: ["./Sounds/Rain.mp3"],
        loop: true,
        volume: 0.5,
      }),
      library: new Howl({
        src: ["./Sounds/Library.mp3"],
        loop: true,
        volume: 0.5,
      }),
      bonfire: new Howl({
        src: ["./Sounds/Bonfire.mp3"],
        loop: true,
        volume: 0.5,
      }),
      binaural: new Howl({
        src: ["./Sounds/Binaural.mp3"],
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
