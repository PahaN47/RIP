export type RadioInputProps = {
  values: string[];
  selectedValue?: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  className?: string;
  title?: string;
};
