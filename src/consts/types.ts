export interface PageConfig {
  label: string;
  path: string;
  icon: string;
}

export type UseAudioRecorderReturn = {
  recording: boolean;
  audioURL: string | null;
  micLevel: number;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
};

export type themeColor = "red" | "green" | "blue";

export interface MediaInput {
  media_urls: string[];
}

export interface Segment {
  start: string;
  end: string;
  text: string;
}

export interface Stats {
  words: number;
  known_words: number;
}

export interface TranscriptionItem {
  media_url: string;
  duration: string;
  segments: Segment[];
  stats: Stats;
}

export type TranscriptionOutput = TranscriptionItem[];
