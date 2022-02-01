import styled from "styled-components";
import FullscreenIcon from "../../public/fullscreen.svg";
import LogoutIcon from "../../public/logout.svg";
import NonFullscreenIcon from "../../public/nonFullscreen.svg";
import Title from "../Title/Title";
import { Button } from "../UI";
import Account from "../Account/Account";
import { useCallback, useContext, useState } from "react";
import { CONTENT } from "../../content";
import Logo from "../Logo";
import UserStore, { UserStoreContext } from "../../store/userStore";
import { observer } from "mobx-react";

const CustomHeader = styled.header`
  display: grid;
  grid-template-columns: auto auto 1fr auto auto auto;
  align-items: center;
  padding: 10px 15px;
  background-color: var(--color-primary);
  box-sizing: border-box;
  height: 50px;
`;

const CustomSvg = styled(LogoutIcon)`
  margin-left: 11px;
`;

const EmptyBox = styled.div``;

const Header = observer((): JSX.Element => {
  const { user } = useContext(UserStoreContext) as UserStore;
  const [fullscreen, setFullscreen] = useState<boolean>(() => {
    if (typeof document === "undefined") {
      return false;
    }
    return !!document.fullscreenElement;
  });

  const logout = useCallback(() => {}, []);

  const handleChangeScreen = useCallback(() => {
    if (typeof document === "undefined") {
      return;
    }
    if (!fullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setFullscreen((prevState) => !prevState);
  }, [fullscreen]);

  return (
    <CustomHeader>
      <Logo />
      <Title variant="console" style={{ marginLeft: "20px" }}>
        {CONTENT.HEADER.TITLE}
      </Title>
      <EmptyBox></EmptyBox>
      <Account
        style={{ marginRight: "30px" }}
        login={user.login}
        sublogin={user.sublogin}
      />
      <Button
        onClick={logout}
        style={{ marginRight: "20px" }}
        variant="transparent"
      >
        {CONTENT.HEADER.BUTTON}
        <CustomSvg />
      </Button>
      <Button onClick={handleChangeScreen} variant="transparent">
        {fullscreen ? <NonFullscreenIcon /> : <FullscreenIcon />}
      </Button>
    </CustomHeader>
  );
});

export default Header;
