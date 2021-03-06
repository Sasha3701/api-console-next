import Main from "../Main/Main";
import { useCallback, useEffect } from "react";
import styled from "styled-components";
import Footer from "../Footer/Footer";
import Header from "../Header";
import Console from "../Console/Console";
import { MIN_WIDTH_TEXTAREA } from "../../const";
import History from "../History/History";
import CheckAuth from "../CheckAuth/CheckAuth";

const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 50px 1fr 70px;
`;

const ConsoleComponent = (): JSX.Element => {
  return (
    <CheckAuth>
      <Wrapper>
        <Header />
        <Main variant="console">
          <History />
          <Console minWidth={MIN_WIDTH_TEXTAREA} />
        </Main>
        <Footer />
      </Wrapper>
    </CheckAuth>
  );
};

export default ConsoleComponent;
