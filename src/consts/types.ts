import type {ReactNode, ReactElement} from 'react';

export interface AudioPlayerProps {
  src: string;
  theme: themeColor;
}

export interface AsideProps {
  pages: PageConfig[];
}

export interface CompoundChildProps {
  children: ReactNode;
}

export interface DropdownMenuProps {
  title: string;
  iconName?: string;
  options?: DropdownOption[];
  changeTitleOnSelect?: boolean;
  swapLabelsOnSelect?: boolean;
  className?: string;
  onSelect?: (label: string) => void;
}

export interface DropdownOption {
  label: string;
  iconName?: string;
}

export interface MainLayoutProps {
  children: ReactNode;
}

export interface MediaInput {
  media_urls: string[];
}

export interface PageConfig {
  label: string;
  path: string;
  icon: string;
}

export interface RangeSliderProps {
  value: number;
  max: number;
  step?: number;
  onChange: (val: number[]) => void;
  theme: themeColor;
  hasThumb?: boolean;
}

export interface RowProps {
  start: string;
  end: string;
  text: string;
}

export interface RowsProps {
  texts: RowProps[];
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

export type TabElement = ReactElement<TabProps>;

export interface TabProps {
  icon: string;
  title: string;
  children: ReactNode;
  theme?: themeColor;
}

export interface TabsProps {
  children: TabElement | TabElement[];
  defaultIndex?: number;
}

export interface TabsWithMenuProps {
  children: TabElement | TabElement[];
  defaultIndex?: number;
  hasDownload: boolean;
  hasCopy: boolean;
  hasTryAgain: boolean;
  theme: themeColor;
  onDownload?: () => void;
  onCopy?: () => void;
  onTryAgain?: () => void;
}

export type themeColor = "red" | "green" | "blue";

export interface TranscriptionItem {
  media_url: string;
  duration: string;
  segments: Segment[];
  stats: Stats;
}

export type TranscriptionOutput = TranscriptionItem[];

export interface TranscriptionTabsProps {
  theme: themeColor;
  audioSrc: string;
  segments: Segment[];
  tryAgain: () => void;
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
  reset: () => void;
}