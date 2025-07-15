import MainLayout from "../layouts/MainLayout";
import Tabs from "../common/Tabs";
import DropdownMenu from "../common/DropDown";
import { useAudioRecorder } from "../../hooks/useAudioRecorder";
import { Audio } from '@sina_byn/re-audio';

const SpeechToTextPage = () => {
  const {recording, audioURL, startRecording, stopRecording} = useAudioRecorder();
  return (
    <MainLayout>
      <MainLayout.Header>
        <h1 className="font-bold text-green text-center">تبدیل متن به گفتار</h1>
        <p className="text-neutral-300 text-center">آوا با استفاده از هزاران ساعت گفتار با صدای افراد مختلف،<br /> زبان فارسی را یاد گرفته است و می‌تواند متن صحبت‌ها را بنویسد.</p>
      </MainLayout.Header>
      <MainLayout.Main>
        <Tabs defaultIndex={0}>
          <Tabs.Tab title="ضبط صدا" icon="mic" theme="green" >
            <div className="flex flex-col justify-center items-center w-150 h-80">
              <button className="bg-green rounded-full w-16 h-16 cursor-pointer" onClick={() => {
                if (recording) {
                  stopRecording();
                } else {
                  startRecording();
                }
              }}>
                <img src="/images/icons/mic-white.svg" alt="record" className="m-auto w-8 h-8"/>
              </button>
              <p className="text-neutral-200 font-light text-center m-2">برای شروع به صحبت، دکمه را فشار دهید<br />متن پیاده شده آن، در اینجا ظاهر شود</p>
              {audioURL}
            </div>
          </Tabs.Tab>
          <Tabs.Tab title="بارگذاری فایل" icon="upload" theme="red" >
            <div className="w-150 h-80"></div>
          </Tabs.Tab>
          <Tabs.Tab title="لینک" icon="chain" theme="blue" >
            <div className="w-150 h-80"></div>
          </Tabs.Tab>
        </Tabs>
        <div className="flex gap-4 items-center absolute mt-3 left-0">
          <p className="font-light text-neutral-200">زبان گفتار:</p>
          <DropdownMenu title="فارسی" options={[{label: "انگلیسی"}]} changeTitleOnSelect={true} 
          swapLabelsOnSelect={true} className="pt-1.5 pb-1.5"/>
        </div>
        <br /><br />
      </MainLayout.Main>
    </MainLayout>
  )
}

export default SpeechToTextPage;