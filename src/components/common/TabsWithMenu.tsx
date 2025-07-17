import React, {useState} from 'react';
import type { FC } from 'react';
import type { TabElement, TabProps, TabsWithMenuProps } from "../../consts/types";
import { getIconPath, getBlackIconPath } from '../../utils/getIconPath';

const TabsWithMenu: FC<TabsWithMenuProps> & { Tab: FC<TabProps> } = 
  ({children, defaultIndex = 0, hasDownload, hasCopy, hasTryAgain, theme}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const tabs = React.Children.toArray(children) as TabElement[];
  return (
    <div className='w-full'>
      <div className="flex justify-between border-b-1 [border-color:hsla(0,0%,0%,0.3)]">
        <div className="flex gap-6">
          {tabs.map((tab, idx) => (
            <button key={idx} className={`flex items-center gap-2 px-2 py-5 cursor-pointer text-neutral-black
            ${idx === activeIndex ? "border-b-2 border-black -mb-[1px]" : "font-light"}`} onClick={() => setActiveIndex(idx)}>
              <img src={activeIndex === idx ? getBlackIconPath(tab.props.icon) : getIconPath(tab.props.icon)} alt='tab icon' className='h-5 w-5' />
              {tab.props.title}
            </button>
          ))}
        </div>
        <div className='flex items-center gap-4'>
          {hasDownload && <button onClick={() => {}}>
            <img src="/images/icons/download.svg" alt="download" />
          </button>}
          {hasCopy && <button onClick={() => {}}>
            <img src="/images/icons/copy.svg" alt="copy" />
          </button>}
          {hasTryAgain && <button onClick={() => {}} className={`bg-${theme} rounded-full px-3 py-1.5 text-neutral-white cursor-pointer`}>
            <img src="/images/icons/refresh.svg" alt="try again" className='inline ml-2' />
            <span>شروع دوباره</span>
          </button>}
        </div>
      </div>
      <div>
        {tabs[activeIndex]?.props.children}
      </div>
    </div>
  );
};

TabsWithMenu.Tab = ({ children }: TabProps) => <>{children}</>;

export default TabsWithMenu;