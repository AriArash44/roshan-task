import type {ReactNode, ReactElement} from 'react';

export interface ArchiveItem {
  id: number;
  url: string;
  duration: string;
  processed: string;
  filename: string;
  segments: Segment[];
}

export interface ArchiveResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ArchiveItem[];
}

export interface AsideProps {
  pages: PageConfig[];
}

export interface AudioPlayerProps {
  src: string;
  theme: themeColor;
  onTimeUpd?: (current: number) => void;
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

export interface PaginationProps {
  totalCount: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
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
  activeIndex?: number;
  theme?: themeColor;
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

export interface TableColumn<T> {
  title: string;
  accessor: keyof T | string;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface TableProps<T extends Record<string, any> = Record<string, any>> {
  data: T[];
  columns: TableColumn<T>[];
  hasIcon?: boolean;
  hasDownload?: boolean;
  hasWord?: boolean;
  hasCopy?: boolean;
  hasDelete?: boolean;
  hasOpen?: boolean;
  onDelete?: (id: number) => void;
}

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
  headerClass?: string;
  contentClass?: string;
}

export type themeColor = "red" | "green" | "blue";

export interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

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
  tryAgain?: () => void;
}

export type UseAudioRecorderReturn = {
  recording: boolean;
  audio: Blob | null;
  micLevel: number;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
};


export interface UseGetOptions {
  url: string;
  headers?: Record<string, string>;
}

export interface UseGetReturn<R> {
  loading: boolean;
  error: string | null;
  data: R | null;
  getData: () => Promise<void>;
  reset: () => void;
}

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