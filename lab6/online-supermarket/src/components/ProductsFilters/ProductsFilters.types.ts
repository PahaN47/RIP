export type ProductsFiltersProps = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  topPrice: number;
  bottomPrice: number;
  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  minPrice: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  handleSearch: () => void;
};
