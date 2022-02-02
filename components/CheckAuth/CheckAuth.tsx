import { observer } from "mobx-react-lite";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { PATHS } from "../../const";
import { UserStoreContext } from "../../store/userStore";
import { IPropsCheckAuth } from "./CheckAuth.props";

const CheckAuth = observer(({ children }: IPropsCheckAuth): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);

  const userStore = useContext(UserStoreContext);

  useEffect(() => {
    setTimeout(() => {
      if (userStore?.user.sessionKey && userStore.user.login) {
        setShow(true);
      } else {
        Router.push(PATHS.auth);
      }
    }, 100);
  }, [userStore?.user.login, userStore?.user.sessionKey]);

  return show ? <>{children}</> : <></>;
});

export default CheckAuth;
