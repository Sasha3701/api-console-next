import { forwardRef } from "react";
import styled from "styled-components";
import DragIcon from "../../../public/drag.svg";
import { IPropsDragButton } from "./DragButton.props";

const Button = styled.button`
  padding: 6px;
  background-color: transparent;
  border: none;
  width: max-content;
  height: max-content;
  cursor: pointer;
  & svg {
    fill: var(--color-gray-light);
  }
  &:hover svg {
    fill: var(--color-gray);
  }
  &:focus {
    outline: none;
  }
  &:active {
    cursor: col-resize;
  }
`;

const DragButton = forwardRef<HTMLButtonElement, IPropsDragButton>(
  (props, ref): JSX.Element => {
    return (
      <Button ref={ref} {...props}>
        <DragIcon />
      </Button>
    );
  }
);

export default DragButton;
