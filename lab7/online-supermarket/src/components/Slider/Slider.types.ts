export type SliderProps = {
  topLimit: number;
  bottomLimit: number;
  maxValue: number;
  minValue: number;
  setMaxValue: React.Dispatch<React.SetStateAction<number>>;
  setMinValue: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
};
