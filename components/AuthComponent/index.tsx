import styled from "styled-components";
import { CONTENT } from "../../content";
import AuthForm from "../AuthForm/AuthForm";
import Logo from "../Logo";
import Main from "../Main/Main";
import Title from "../Title/Title";
import Notification from "../Notification/Notification";
import { useContext, useEffect } from "react";
import UserStore, { UserStoreContext } from "../../store/userStore";
import { observer } from "mobx-react";
import Router from "next/router";
import { PATHS } from "../../const";

const Container = styled.div`
  padding: 40px 30px;
  background-color: var(--text-colot-white);
  width: 520px;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  &:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

const AuthComponent = observer((): JSX.Element => {
  const userStore = useContext(UserStoreContext) as UserStore

  useEffect(() => {
    if(userStore.user.login) {
      Router.push(PATHS.console)
    }
  }, [userStore.user.login])

  return (
    <Main variant="auth">
      <Logo />
      <Container style={{ marginTop: "20px" }}>
        <Title style={{ marginBottom: "20px" }} variant="auth">
          {CONTENT.AUTH.TITLE}
        </Title>
        <Notification
          errorMessage={userStore.errorMessage}
          style={{ marginBottom: "20px" }}
        />
        <AuthForm userStore={userStore} />
      </Container>
    </Main>
  );
});

export default AuthComponent;
