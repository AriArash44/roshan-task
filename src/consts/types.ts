export interface PageConfig {
  label: string;
  path: string;
  icon: string;
}

export type UseAudioRecorderReturn = {
  recording: boolean;
  audioURL: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
};

export type themeColor = "red" | "green" | "blue";