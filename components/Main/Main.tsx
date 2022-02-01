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

const MainHistory = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  height: calc(100vh - 50px);
  border-top: 1px solid var(--color-gray-light);
  box-sizing: border-box;
`;

const Main = ({ children, variant }: IPropsMain): JSX.Element => {
  switch (variant) {
    case "auth":
      return <MainAuth>{children}</MainAuth>;
    case "console":
      return <MainConsole>{children}</MainConsole>;
    case "history":
      return <MainHistory>{children}</MainHistory>;
    default:
      const a: never = variant;
      return <></>;
  }
};

export default Main;
