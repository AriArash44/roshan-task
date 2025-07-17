import { useEffect, useMemo, useRef, useState } from 'react';
import MainLayout from "../layouts/MainLayout";
import Tabs from "../common/Tabs";
import TabsWithMenu from '../common/TabsWithMenu';
import DropdownMenu from "../common/DropDown";
import { useAudioRecorder } from "../../hooks/useAudioRecorder";
import { usePost } from "../../hooks/usePost";
import { useBytescaleUploader } from '../../hooks/useBytescaleUploader';
import type { TranscriptionOutput, MediaInput } from "../../consts/types";
import { showToast } from '../../utils/showToastHandler';
import AudioPlayer from '../common/AudioPlayer';
import RowsTable from '../common/Rows';

const SpeechToTextPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [ uploadedAudio, setuploadedAudio ] = useState<Blob | null>(null);
  const { recording, audio, micLevel, startRecording, stopRecording } = useAudioRecorder();
  const { loading, error, data, postData } = usePost<MediaInput, TranscriptionOutput>({
    url: "/transcribe_files/", headers: {Authorization: `Token ${import.meta.env.VITE_API_KEY}` },
  });
  const { uploading, errorUploading, fileUrl } = useBytescaleUploader(audio || uploadedAudio);
  const scale = useMemo(() => 1 + micLevel * 0.5, [micLevel]);
  const icon = useMemo(() => (recording ? '/images/icons/pause.svg' : '/images/icons/mic-white.svg'),[recording]);
  const handleToggleRecording = async () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };
  const handleUploadButtonClicked = () => {
    inputRef.current?.click();
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setuploadedAudio(file);
    }
  };

  useEffect(() => {
    if (!fileUrl) return;
    (async () => {
      try {
        await postData({ media_urls: [fileUrl] });
      } catch (err) {
        console.error('Upload failed:', err);
      }
    })();
  }, [fileUrl]);
  useEffect(() => {
    if(error || errorUploading){
      showToast(error ?? errorUploading!);
    }
  }, [error, errorUploading]);

  return (
    <MainLayout>
      <MainLayout.Header>
        <h1 className="font-bold text-green text-center">تبدیل متن به گفتار</h1>
        <p className="text-neutral-300 text-center">
          آوا با استفاده از هزاران ساعت گفتار با صدای افراد مختلف،<br />
          زبان فارسی را یاد گرفته است و می‌تواند متن صحبت‌ها را بنویسد.
        </p>
      </MainLayout.Header>
      <MainLayout.Main>
        <Tabs defaultIndex={0}>
          <Tabs.Tab title="ضبط صدا" icon="mic" theme="green">
            <div className="flex flex-col justify-center items-center w-150 h-80">
              {!loading && !uploading ? (
                !data ? (
                  <>
                    <button onClick={handleToggleRecording} style={{ transform: `scale(${scale})` }}
                    className="bg-green rounded-full w-16 h-16 cursor-pointer transition-transform duration-30">
                      <img src={icon} alt={recording ? 'stop' : 'record'} className="m-auto w-8 h-8" />
                    </button>
                    <p className="text-neutral-200 font-light text-center mt-2">برای شروع به صحبت، دکمه را فشار دهید<br />متن پیاده شده آن، در اینجا ظاهر شود</p>
                  </>
                ) : (
                  <TabsWithMenu defaultIndex={0} hasDownload={true} hasCopy={true} hasTryAgain={true} theme='green'>
                    <TabsWithMenu.Tab title='متن ساده' icon='text'>
                      <p className='font-light'>{data[0].segments.reduce((acc, cur) => acc.concat(cur["text"] + " "), "")}</p>
                      <div className="absolute bottom-0 w-[94%] mb-5">
                        <AudioPlayer src={fileUrl!} theme="green"/>
                      </div>
                    </TabsWithMenu.Tab>
                    <TabsWithMenu.Tab title='متن زمان‌بندی شده' icon='time'>
                      <RowsTable texts={data[0].segments} />
                      <div className="absolute bottom-0 w-[94%] mb-5 pt-2 bg-neutral-white">
                        <AudioPlayer src={fileUrl!} theme="green"/>
                      </div>
                    </TabsWithMenu.Tab>
                  </TabsWithMenu>
                )
              ) : (
                <span className="loader"></span>
              )}
            </div>
          </Tabs.Tab>
          <Tabs.Tab title="بارگذاری فایل" icon="upload" theme="blue">
            <div className="flex flex-col justify-center items-center w-150 h-80">
              {!loading && !uploading ? (
                !data ? (
                  <>
                    <input type="file" ref={inputRef} onChange={handleFileChange} className="hidden" />
                    <button onClick={handleUploadButtonClicked} className="bg-blue rounded-full w-16 h-16 cursor-pointer transition-transform duration-30">
                      <img src="/images/icons/upload-white.svg" alt="upload" className="m-auto w-8 h-8" />
                    </button>
                    <p className="text-neutral-200 font-light text-center mt-2">برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید<br/>متن پیاده شده آن، در اینجا ظاهر می شود</p>
                  </>
                ) : (
                  <TabsWithMenu defaultIndex={0} hasDownload={true} hasCopy={true} hasTryAgain={true} theme='blue'>
                    <TabsWithMenu.Tab title='متن ساده' icon='text'>
                      <p className='font-light'>{data[0].segments.reduce((acc, cur) => acc.concat(cur["text"] + " "), "")}</p>
                      <div className="absolute bottom-0 w-[94%] mb-5">
                        <AudioPlayer src={fileUrl!} theme="blue"/>
                      </div>
                    </TabsWithMenu.Tab>
                    <TabsWithMenu.Tab title='متن زمان‌بندی شده' icon='time'>
                      <RowsTable texts={data[0].segments} />
                      <div className="absolute bottom-0 w-[94%] mb-5 pt-2 bg-neutral-white">
                        <AudioPlayer src={fileUrl!} theme="blue"/>
                      </div>
                    </TabsWithMenu.Tab>
                  </TabsWithMenu>
                )
              ) : (
                <span className="loader"></span>
              )}
            </div>
          </Tabs.Tab>
          <Tabs.Tab title="لینک" icon="chain" theme="red">
            <div className="w-150 h-80"></div>
          </Tabs.Tab>
        </Tabs>
        <div className="flex gap-4 items-center absolute mt-3 left-0">
          <p className="font-light text-neutral-200">زبان گفتار:</p>
          <DropdownMenu title="فارسی" options={[{ label: 'انگلیسی' }]} changeTitleOnSelect={true} swapLabelsOnSelect={true} className="pt-1.5 pb-1.5" />
        </div><br /> <br />
      </MainLayout.Main>
    </MainLayout>
  );
};

export default SpeechToTextPage;