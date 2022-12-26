import React, { useCallback, useEffect, useMemo } from "react";

import { SliderProps } from "./Slider.types";

import "./Slider.style.ts";
import {
  BgStyled,
  InputWrapStyled,
  InRangeBgStyled,
  InvisibleInputRange,
} from "./Slider.style";

export const Slider = ({
  topLimit,
  bottomLimit,
  maxValue,
  minValue,
  setMaxValue,
  setMinValue,
  className,
}: SliderProps) => {
  const handleChangeMin = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value);
      if (value < maxValue) setMinValue(value);
    },
    [maxValue, setMinValue]
  );

  const handleChangeMax = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value);
      if (value > minValue) setMaxValue(value);
    },
    [minValue, setMaxValue]
  );

  const displayMinValue = useMemo(
    () => (minValue >= bottomLimit ? minValue : bottomLimit),
    [bottomLimit, minValue]
  );

  const displayMaxValue = useMemo(
    () => (maxValue <= topLimit ? maxValue : topLimit),
    [maxValue, topLimit]
  );

  return (
    <InputWrapStyled className={className}>
      <InvisibleInputRange
        type="range"
        value={displayMinValue}
        onChange={handleChangeMin}
        min={bottomLimit}
        max={topLimit}
      />
      <InvisibleInputRange
        type="range"
        value={displayMaxValue}
        onChange={handleChangeMax}
        min={bottomLimit}
        max={topLimit}
      />
      <BgStyled />
      <InRangeBgStyled
        minValue={displayMinValue}
        maxValue={displayMaxValue}
        topLimit={topLimit}
        bottomLimit={bottomLimit}
      />
    </InputWrapStyled>
  );
};
