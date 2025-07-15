import { useState, useRef, useCallback, useEffect } from "react";
import type { UseAudioRecorderReturn } from "../consts/types";

export function useAudioRecorder(): UseAudioRecorderReturn {
  const [recording, setRecording] = useState<boolean>(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [micLevel, setMicLevel] = useState<number>(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameId = useRef<number>(0);
  
  const startRecording = useCallback(async (): Promise<void> => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioCtx = new AudioContext();
    audioContextRef.current = audioCtx;
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 32;
    analyserRef.current = analyser;
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const updateVolume = () => {
      analyser.getByteFrequencyData(dataArray);
      const avg = dataArray.reduce((sum, v) => sum + v, 0) / dataArray.length;
      setMicLevel(Math.min(1, avg / 128));
      animationFrameId.current = requestAnimationFrame(updateVolume);
    };
    animationFrameId.current = requestAnimationFrame(updateVolume);
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e: BlobEvent) => {
      if (e.data.size > 0) audioChunksRef.current.push(e.data);
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      setAudioURL(URL.createObjectURL(blob));
      audioChunksRef.current = [];
    };
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setRecording(true);
  }, []);

  const stopRecording = useCallback((): void => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }
    cancelAnimationFrame(animationFrameId.current);
    audioContextRef.current?.close();
    audioContextRef.current = null;
    analyserRef.current = null;
    setRecording(false);
    setMicLevel(0);
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationFrameId.current);
      audioContextRef.current?.close();
    };
  }, []);

  return {
    recording,
    audioURL,
    micLevel,
    startRecording,
    stopRecording,
  };
}
