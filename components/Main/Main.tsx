import styled from "styled-components";
import { IPropsMain } from "./Main.props";

const MainConsole = styled.main``;

const MainAuth = styled.main`
  background-color: var(--color-primary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Main = ({ children, variant }: IPropsMain): JSX.Element => {
  switch (variant) {
    case "auth":
      return <MainAuth>{children}</MainAuth>;
    case "console":
      return <MainConsole>{children}</MainConsole>;
    default:
      const a: never = variant;
      return <></>;
  }
};

export default Main;
