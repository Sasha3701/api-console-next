import { forwardRef } from "react";
import styled from "styled-components";
import { IInput, ILabel, IPropsInput } from "./Input.props";

const Label = styled.label<ILabel>`
  display: flex;
  flex-direction: column;
  line-height: 20px;
  font-size: 16px;
  color: ${({ error }): string =>
    error ? "var(--color-red)" : "var(--text-color-main)"};
`;

const CustomInput = styled.input<IInput>`
  padding: 5px 10px;
  line-height: 30px;
  margin-top: 5px;
  color: var(--text-color-main);
  font-size: 18px;
  border-radius: 5px;
  border: 1px solid
    ${({ error }): string =>
      error ? "var(--color-red)" : "var(--color-gray-light)"};
  transition: all 0.3s;
  &:hover {
    border: 1px solid
      ${({ error }): string =>
        error ? "var(--color-red)" : "var(--color-gray)"};
  }
  &:focus {
    border: 1px solid
      ${({ error }): string =>
        error ? "var(--color-red)" : "var(--color-gray)"};
    outline: 2px solid var(--color-gray-light);
  }
`;

const Input = forwardRef<HTMLInputElement, IPropsInput>(
  ({ label, style, error = true, ...props }, ref): JSX.Element => {
    return (
      <Label error={error} style={style}>
        {label}
        <CustomInput error={error} ref={ref} {...props} />
      </Label>
    );
  }
);

export default Input;
