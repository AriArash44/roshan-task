import { useState, useRef } from "react";
import { getIconPath } from "../../utils/getIconPath";
import type { DropdownOption, DropdownMenuProps } from "../../consts/types";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const DropdownMenu: React.FC<DropdownMenuProps> = ({iconName, title, options = [], 
    changeTitleOnSelect = false, swapLabelsOnSelect = false, className = "", onSelect }) => {
  const [open, setOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [optionsState, setOptionsState] = useState<DropdownOption[]>(options);
  function handleOptionClick(opt: DropdownOption) {
    if (changeTitleOnSelect) {
      setCurrentTitle(opt.label);
    }
    if (swapLabelsOnSelect) {
      setOptionsState(prev =>
        prev.map(o =>
          o.label === opt.label
            ? { ...o, label: currentTitle }
            : o
        )
      );
    }
    onSelect?.(opt.label);
    setOpen(false);
  }
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(dropdownRef, () => setOpen(false));
  return (
    <div className={`px-5 py-2.5 border border-green rounded-3xl ${className}`} ref={dropdownRef}>
      <button className="flex items-center gap-1 cursor-pointer" onClick={() => setOpen((o) => !o)}>
        {iconName && <img src={getIconPath(iconName)} alt={iconName} />}
        <span className="text-green">{currentTitle}</span>
        <img src={getIconPath(open ? "lift" : "drop")} alt="toggle" className="mr-2" />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul>
          {optionsState.map((opt, idx) => (
            <li key={idx} className="border-t-1 border-green mt-2 pt-2">
              <button className="flex items-center gap-2 cursor-pointer" onClick={() => handleOptionClick(opt)}>
                {opt.iconName && <img src={getIconPath(opt.iconName)} alt={opt.iconName} />}
                <span className="text-green">{opt.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;