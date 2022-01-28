import { forwardRef } from "react";
import styled from "styled-components";
import Loader from "../../Loader";
import { IPropsButton } from "./Button.props";

const ButtonFill = styled.button`
  background: var(--gradient-blue);
  color: var(--text-colot-white);
  padding: 12px 31px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  transition: all 0.3s;
  outline: none;
  min-width: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.85;
  }
  &:active {
    opacity: 1;
    background: var(--gradient-blue-dark);
  }
  &:focus {
    outline: 2px solid var(--color-blue-light);
  }
  &:disabled {
    background: var(--gradient-gray);
  }
`;

const ButtonTransparent = styled.button`
  background-color: transparent;
  color: var(--text-color-main);
`;

const Button = forwardRef<HTMLButtonElement, IPropsButton>(
  ({ variant = "fill", loading = false, children, ...props }, ref): JSX.Element => {
    switch (variant) {
      case "fill":
        return (
          <ButtonFill ref={ref} disabled={loading} {...props}>
            {loading ? <Loader /> : children}
          </ButtonFill>
        );
      case "transparent":
        return <ButtonTransparent ref={ref} {...props}>{children}</ButtonTransparent>;
      default:
        const a: never = variant;
        return <></>;
    }
  }
);

export default Button;