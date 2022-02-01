import Link from "next/link";
import { forwardRef, memo } from "react";
import styled from "styled-components";
import { PATHS } from "../../../const";
import { IPropsLink } from "./Link.props";

const CustomLink = styled.a`
  padding: 5px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  border: 1px solid var(--color-gray-light);
  font-size: 16px;
  line-height: 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover, :active {
      color: var(--text-colot-white);
      background-color: var(--color-blue);
  }
`;

const MyLink = forwardRef<HTMLAnchorElement, IPropsLink>(
  ({ path, ...props }, ref): JSX.Element => {
    return (
      <Link href={path === "/" ? PATHS.history : PATHS.console}>
        <CustomLink ref={ref} {...props}>
          {path === "/" ? "History" : "Console"}
        </CustomLink>
      </Link>
    );
  }
);

export default memo(MyLink);
