import MainLayout from "../layouts/MainLayout";
import Tabs from "../common/Tabs";
import DropdownMenu from "../common/DropDown";

const SpeechToTextPage = () => {
  return (
    <MainLayout>
      <MainLayout.Header>
        <h1 className="font-bold text-green text-center">تبدیل متن به گفتار</h1>
        <p className="text-neutral-300 text-center">آوا با استفاده از هزاران ساعت گفتار با صدای افراد مختلف،<br /> زبان فارسی را یاد گرفته است و می‌تواند متن صحبت‌ها را بنویسد.</p>
      </MainLayout.Header>
      <MainLayout.Main>
        <Tabs defaultIndex={0}>
          <Tabs.Tab title="ضبط صدا" icon="mic" theme="green" >
            <div className="w-150 h-80"></div>
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