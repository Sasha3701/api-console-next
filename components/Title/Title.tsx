import { forwardRef } from "react";
import styled from "styled-components";
import { IPropsTitle, ITitle } from "./Title.props";

const CustomTitle = styled.h1<ITitle>`
  color: var(--text-color-main);
  font-size: ${({ variant }): string => (variant === "auth" ? "24px" : "20px")};
  margin: 0;
  font-weight: 400;
`;

const Title = forwardRef<HTMLHeadingElement, IPropsTitle>(({ children, variant, ...props }, ref): JSX.Element => {
  return <CustomTitle variant={variant} ref={ref} {...props}>{children}</CustomTitle>
});

export default Title;
