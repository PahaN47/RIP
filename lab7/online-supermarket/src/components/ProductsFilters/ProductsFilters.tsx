import React, { useCallback } from "react";

import { ProductsFiltersProps } from "./ProductsFilters.types";

import "./ProductsFilters.style.ts";
import {
  FiltersWrapStyled,
  SearchInputStyled,
  SliderInputStyled,
  SliderStyled,
  SliderValueStyled,
  SliderWrapStyled,
  SubmitButtonStyled,
} from "./ProductsFilters.style";

export const ProductsFilters = ({
  searchValue,
  setSearchValue,
  topPrice,
  bottomPrice,
  maxPrice,
  setMaxPrice,
  minPrice,
  setMinPrice,
  handleSearch,
}: ProductsFiltersProps) => {
  const handleMinValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMinPrice(parseInt(e.target.value) || 0);
    },
    [setMinPrice]
  );

  const handleMinValueBlur = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value) {
        let newValue = parseInt(e.target.value);

        if (newValue < bottomPrice) newValue = bottomPrice;
        else if (newValue > topPrice - 1) newValue = topPrice - 1;

        if (newValue >= maxPrice) setMaxPrice(topPrice);

        setMinPrice(newValue);
      } else setMinPrice(bottomPrice);
    },
    [bottomPrice, maxPrice, setMaxPrice, setMinPrice, topPrice]
  );

  const handleMaxValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMaxPrice(parseInt(e.target.value) || 0);
    },
    [setMaxPrice]
  );

  const handleMaxValueBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (e.target.value) {
        let newValue = parseInt(e.target.value);

        if (newValue < bottomPrice + 1) newValue = bottomPrice + 1;
        else if (newValue > topPrice) newValue = topPrice;

        if (newValue <= minPrice) setMinPrice(bottomPrice);

        setMaxPrice(newValue);
      } else setMaxPrice(minPrice + 1);
    },
    [bottomPrice, minPrice, setMaxPrice, setMinPrice, topPrice]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    [setSearchValue]
  );

  return (
    <FiltersWrapStyled>
      <SliderWrapStyled>
        <SliderStyled
          maxValue={maxPrice}
          minValue={minPrice}
          setMaxValue={setMaxPrice}
          setMinValue={setMinPrice}
          topLimit={topPrice}
          bottomLimit={bottomPrice}
        />
        <SliderValueStyled>
          <SliderInputStyled
            type="text"
            value={minPrice}
            onChange={handleMinValueChange}
            onBlur={handleMinValueBlur}
          />
          {" - "}
          <SliderInputStyled
            type="text"
            value={maxPrice}
            onChange={handleMaxValueChange}
            onBlur={handleMaxValueBlur}
          />
          {"руб."}
        </SliderValueStyled>
      </SliderWrapStyled>
      <div>
        <SearchInputStyled value={searchValue} onChange={handleSearchChange} />
        <SubmitButtonStyled onClick={handleSearch}>Поиск</SubmitButtonStyled>
      </div>
    </FiltersWrapStyled>
  );
};
