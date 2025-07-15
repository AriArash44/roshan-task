import { useState } from "react";
import { getIconPath } from "../../utils/getIconPath";
import type { DropdownOption, DropdownMenuProps } from "../../consts/types";

const DropdownMenu: React.FC<DropdownMenuProps> = ({iconName, title, options = [], 
    changeTitleOnSelect = false, swapLabelsOnSelect = false, className = ""}) => {
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
    setOpen(false);
  }
  return (
    <div className={`px-5 py-2.5 border border-green rounded-3xl ${className}`}>
      <button className="flex items-center gap-1 cursor-pointer" onClick={() => setOpen((o) => !o)}>
        {iconName && <img src={getIconPath(iconName)} alt={iconName} />}
        <span className="text-green">{currentTitle}</span>
        <img src={getIconPath(open ? "lift" : "drop")} alt="toggle" className="mr-2" />
      </button>
      {open && optionsState.length > 0 && (
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
      )}
    </div>
  );
};

export default DropdownMenu;