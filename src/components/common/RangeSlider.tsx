import { useMemo } from "react";
import type { FC } from "react";
import * as Slider from "@radix-ui/react-slider";
import type { RangeSliderProps } from "../../consts/types";

const RangeSlider: FC<RangeSliderProps> = ({ value, max, step = 0.1, onChange, theme, hasThumb = true }) => {
  const trackBg = "bg-[#c4c4c4]";
  const progressedBg = useMemo(() => `bg-${theme}`, [theme]);
  return (
    <Slider.Root value={[value]} max={max} step={step} onValueChange={onChange} 
      className="relative flex w-full select-none touch-none items-center h-6">
      <Slider.Track className={`relative h-1 flex-1 ${trackBg} rounded cursor-pointer`}>
        <Slider.Range className={`absolute h-full ${progressedBg} rounded`} />
      </Slider.Track>
      {hasThumb && <Slider.Thumb className={`${progressedBg} block w-4 h-4 rounded-full cursor-grab focus:outline-none`} />}
    </Slider.Root>
  );
};

export default RangeSlider;
