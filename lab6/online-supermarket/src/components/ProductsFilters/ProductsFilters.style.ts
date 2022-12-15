import styled from "styled-components";
import { Slider } from "../Slider";

export const FiltersWrapStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SliderWrapStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 24px;
  background: #ffffff;
  border-radius: 12px;
`;

export const SliderStyled = styled(Slider)`
  width: 360px;
`;

export const SliderValueStyled = styled.div`
  color: #242436;
  font-size: 16px;
  margin-left: 24px;
`;

export const SliderInputStyled = styled.input`
  width: 64px;
  border: 1px solid #0000301a;
  border-radius: 6px;
  color: #242436;
  font-size: 16px;
  font-weight: 600;

  &:focus-visible {
    outline: none;
  }
`;

export const SearchInputStyled = styled(SliderInputStyled)`
  width: 256px;
  padding: 8px;
  border-radius: 12px;
`;

export const SubmitButtonStyled = styled.button`
  border: none;
  padding: 8px 12px;
  border-radius: 12px;
  background: royalblue;
  font-size: 16px;
  margin-left: 16px;
  color: #efefff;
  transition: all 0.5s;

  &:hover {
    background: #3159d1;
  }
`;
