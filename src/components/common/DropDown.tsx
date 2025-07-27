import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { toggleDropdown, closeDropdown } from "../../store/slices/dropDownSlice";
import { getIconPath } from "../../utils/getIconPath";
import type { DropdownOption, DropdownMenuProps } from "../../consts/types";

interface ReduxDropdownMenuProps extends DropdownMenuProps {
  id: string;
}

const DropdownMenu: React.FC<ReduxDropdownMenuProps> = ({id, iconName, title, options = [],
  changeTitleOnSelect = false, swapLabelsOnSelect = false, className = "", onSelect,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const open = useSelector((state: RootState) => state.dropdown.openId === id);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [optionsState, setOptionsState] = useState<DropdownOption[]>(options);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if ( open && ref.current && !ref.current.contains(e.target as Node) ) {
        dispatch(closeDropdown());
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () =>
      document.removeEventListener("mousedown", onMouseDown);
  }, [open, dispatch]);
  function handleToggle() {
    dispatch(toggleDropdown(id));
  }
  function handleOptionClick(opt: DropdownOption) {
    if (changeTitleOnSelect) {
      setCurrentTitle(opt.label);
    }
    if (swapLabelsOnSelect) {
      setOptionsState((prev) =>
        prev.map((o) =>
          o.label === opt.label
            ? { ...o, label: currentTitle }
            : o
        )
      );
    }
    onSelect?.(opt.label);
    dispatch(closeDropdown());
  }
  return (
    <div
      ref={ref}
      className={`px-5 py-2.5 border border-green rounded-3xl ${className}`}
    >
      <button
        className="flex items-center gap-1 cursor-pointer"
        onClick={handleToggle}
      >
        {iconName && (
          <img src={getIconPath(iconName)} alt={iconName} />
        )}
        <span className="text-green">{currentTitle}</span>
        <img
          src={getIconPath(open ? "lift" : "drop")}
          alt="toggle"
          className="mr-2"
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul>
          {optionsState.map((opt, idx) => (
            <li
              key={idx}
              className="border-t-1 border-green mt-2 pt-2"
            >
              <button
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleOptionClick(opt)}
              >
                {opt.iconName && (
                  <img
                    src={getIconPath(opt.iconName)}
                    alt={opt.iconName}
                  />
                )}
                <span className="text-green">
                  {opt.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;