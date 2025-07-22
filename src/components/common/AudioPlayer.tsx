import { useState, useRef, useEffect } from "react";
import type { FC } from "react";
import { getIconPath } from "../../utils/getIconPath";
import RangeSlider from "./RangeSlider";
import type { AudioPlayerProps } from "../../consts/types";
import { secToTime } from "../../utils/formatTime";

const AudioPlayer: FC<AudioPlayerProps> = ({ src, theme, onTimeUpd }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const playIcon = getIconPath("start");
  const pauseIcon = getIconPath("stop");
  const volumeIcon = getIconPath("volume");

  const togglePlay = () => {
    if (!audioRef.current) return;
    if(isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const onSeek = ([newTime]: number[]) => {
    if (audioRef.current) audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    onTimeUpd?.(newTime);
  };

  const onVolumeChange = ([newVol]: number[]) => {
    if (audioRef.current) audioRef.current.volume = newVol;
    setVolume(newVol);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onLoaded = () => setDuration(audio.duration);
    const onTimeUpdate = () => {
      const t = audio.currentTime;
      setCurrentTime(t);
      onTimeUpd?.(t);
    };
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <div className="w-[80%] m-auto px-3 py-1.5 bg-neutral-500 rounded-xl" dir="ltr">
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="flex items-center gap-4">
        <button onClick={togglePlay} className="cursor-pointer">
          <img src={isPlaying ? pauseIcon : playIcon} alt={isPlaying ? "Pause" : "Play"} className="h-4 w-4" />
        </button>
        <RangeSlider value={currentTime} max={duration || 0} onChange={onSeek} theme={theme} />
        <img src={volumeIcon} alt="volume" className="h-4 w-4" />
        <p className="fanum">{secToTime(currentTime)}</p>
        <div className="flex-1/5">
          <RangeSlider value={volume} max={1} step={0.01} onChange={onVolumeChange} theme={theme} hasThumb={false}/>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
