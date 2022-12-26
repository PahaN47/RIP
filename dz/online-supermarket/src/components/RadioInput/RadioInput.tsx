import React, { useMemo } from "react";

import { RadioInputProps } from "./RadioInput.types";

import "./RadioInput.style.ts";
import {
  RadioStyled,
  InputContainerStyled,
  RadioContainerStyled,
  LabelStyled,
} from "./RadioInput.style";

export const RadioInput: React.FC<RadioInputProps> = ({
  values,
  selectedValue,
  setSelectedValue,
  className,
  title,
}) => {
  const renderRadios = useMemo(
    () =>
      values.map((value, index) => (
        <RadioContainerStyled>
          <RadioStyled
            id={`${className}cb#${index}${value}`}
            type="radio"
            onChange={() => setSelectedValue(value)}
            checked={value === selectedValue}
          />
          <LabelStyled
            htmlFor={`${className}cb#${index}${value}`}
            isSelected={value === selectedValue}
          >
            {value}
          </LabelStyled>
        </RadioContainerStyled>
      )),
    [className, selectedValue, setSelectedValue, values]
  );
  return (
    <InputContainerStyled className={className}>
      {title}
      {renderRadios}
    </InputContainerStyled>
  );
};
