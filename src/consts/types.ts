import type {ReactNode, ReactElement} from 'react';

export interface PageConfig {
  label: string;
  path: string;
  icon: string;
}

export interface AsideProps {
  pages: PageConfig[];
}

export interface DropdownOption {
  label: string;
  iconName?: string;
}

export interface DropdownMenuProps {
  title: string;
  iconName?: string;
  options?: DropdownOption[];
  changeTitleOnSelect?: boolean;
  swapLabelsOnSelect?: boolean;
  className?: string;
}

export type themeColor = "red" | "green" | "blue";

export interface TabProps {
  icon: string;
  title: string;
  children: ReactNode;
  theme: themeColor;
}

export type TabElement = ReactElement<TabProps>;

export interface TabsProps {
  children: TabElement | TabElement[];
  defaultIndex?: number;
}

export interface MainLayoutProps {
  children: ReactNode;
}

export interface CompoundChildProps {
  children: ReactNode;
}

export type UseAudioRecorderReturn = {
  recording: boolean;
  audio: Blob | null;
  micLevel: number;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
};

export interface UsePostOptions<T> {
  url: string;
  headers?: Record<string, string>;
  body?: T;
}

export interface UsePostReturn<R> {
  loading: boolean;
  error: string | null;
  data: R | null;
  postData: (body?: any) => Promise<void>;
}

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
 