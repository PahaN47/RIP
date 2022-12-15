import styled, { css } from "styled-components";

export const InputWrapStyled = styled.div`
  position: relative;
  margin-bottom: 36px;
`;

export const InvisibleInputRange = styled.input`
  width: 100%;
  top: 0;
  position: absolute;
  z-index: 2;

  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    &[type="range"] {
      overflow: hidden;
      -webkit-appearance: none;
      background-color: transparent;
      overflow: visible;
      background: #00000005;
    }

    &[type="range"]::-webkit-slider-runnable-track {
      height: 0px;
      -webkit-appearance: none;
      margin-top: -1px;
    }

    &[type="range"]::-webkit-slider-thumb {
      width: 12px;
      -webkit-appearance: none;
      height: 48px;
      cursor: ew-resize;
      background: royalblue;
      clip-path: path(
        "M 0 4 C 0 1 1 0 4 0 L 8 0 C 11 0 12 1 12 4 L 12 10 C 12 11 12 12 10.5 15 L 6 24 L 1.5 15 C 0 12 0 11 0 10 L 0 4"
      );
      top: 16px;
    }
  }

  &[type="range"]::-moz-range-progress {
    background-color: transparent;
  }
  &[type="range"]::-moz-range-track {
    background-color: transparent;
  }

  &[type="range"]::-ms-fill-lower {
    background-color: transparent;
  }
  &[type="range"]::-ms-fill-upper {
    background-color: transparent;
  }
`;

export const BgStyled = styled.div`
  top: 21px;
  position: absolute;
  width: calc(100% - 12px);
  left: 8px;
  right: 4px;
  height: 4px;
  border-radius: 4px;
  background: #000030;
  opacity: 10%;
`;

export const InRangeBgStyled = styled.div<{
  minValue: number;
  maxValue: number;
  topLimit: number;
  bottomLimit: number;
}>`
  position: absolute;
  z-index: 1;
  top: 21px;

  ${({ minValue, maxValue, topLimit, bottomLimit }) => css`
    left: calc(
      (100% - 12px) * (${(minValue - bottomLimit) / (topLimit - bottomLimit)}) +
        8px
    );
    right: calc(
      (100% - 12px) *
        (1 - ${(maxValue - bottomLimit) / (topLimit - bottomLimit)}) + 4px
    );
  `}

  background: #bbbbff;
  height: 4px;
`;
