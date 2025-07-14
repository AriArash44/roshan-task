import MainLayout from "../layouts/MainLayout";
import Tabs from "../common/Tabs";

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
        
      </MainLayout.Main>
    </MainLayout>
  )
}

export default SpeechToTextPage;