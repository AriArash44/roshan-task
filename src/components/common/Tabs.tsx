import React, {useState} from 'react';
import type { FC } from 'react';
import type { TabElement, TabProps, TabsProps } from "../../consts/types";
import { getIconPath, getWhiteIconPath } from '../../utils/getIconPath';

const Tabs: FC<TabsProps> & { Tab: FC<TabProps> } = ({children, defaultIndex = 0}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const tabs = React.Children.toArray(children) as TabElement[];
  return (
    <div>
      <div className="flex">
        {tabs.map((tab, idx) => (
          <button key={idx} onClick={() => setActiveIndex(idx)} className={`flex gap-1 rounded-t-lg px-4 py-2 cursor-pointer
          ${activeIndex === idx ? `text-white bg-${tab.props.theme}` : "text-neutral-300 font-light"}`}>
            <img src={activeIndex === idx ? getWhiteIconPath(tab.props.icon) : getIconPath(tab.props.icon)} alt='tab icon' />
            {tab.props.title}
          </button>
        ))}
      </div>
      <div className={`border border-${tabs[activeIndex].props.theme} rounded-3xl p-5 relative
      ${activeIndex === 0 ? "rounded-tr-none" : ""} shadow-md`}>
        {tabs[activeIndex]?.props.children}
      </div>
    </div>
  );
};

Tabs.Tab = ({ children }: TabProps) => <>{children}</>;

export default Tabs;