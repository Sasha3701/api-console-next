import { configure, makeAutoObservable, runInAction } from "mobx";
import { enableStaticRendering } from "mobx-react";
import { makePersistable } from "mobx-persist-store";
import { IError, IUser, nullableTypes } from "../models";
import sendsay from "../api";
import { getCookie } from "../utils";

configure({ enforceActions: "observed" });

const isServer = typeof window === "undefined";
enableStaticRendering(isServer);

export interface IUserState {
  login: nullableTypes<string>;
  sublogin: nullableTypes<string>;
}

class UserStore {
  user: IUserState = {
    login: null,
    sublogin: null,
  };
  error: IError = {
    id: "",
    explain: "",
  };
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "user",
      properties: ["user"],
      storage:  typeof window === "undefined" ? undefined : window.localStorage,
    });
  }

  get errorMessage() {
    if (this.error.explain && this.error.id) {
      return `{id: "${this.error.id}", explain: "${this.error.explain}"}`;
    }
    return null;
  }

  hydrate(data: IUserState) {
    this.user = data != null ? data : { login: null, sublogin: null };
  }

  signInRequest(data: IUser) {
    this.user.login = null;
    this.user.sublogin = null;
    this.loading = true;
    sendsay
      .request({ action: "login", ...data })
      .then((res: any) => {
        this.signInSuccess(res);
      })
      .catch((e: IError) => {
        runInAction(() => {
          this.error = e;
        });
      });
  }

  signInSuccess(res: IUserState) {
    document.cookie = `sendsay_ssesion=${sendsay.session}`;
    this.user.login = res.login;
    this.user.sublogin = res.sublogin;
    this.loading = false;
  }

  check() {
    sendsay
      .request({
        action: "pong",
        session: getCookie("sendsay_ssesion"),
      })
      .catch(() => {
        this.logout();
      });
  }

  logout() {
    sendsay
      .request({
        action: "logout",
      })
      .then(() => {
        document.cookie = "";
        this.user.login = null;
        this.user.sublogin = null;
      })
      .catch((e: IError) => {
        runInAction(() => {
          this.error = e;
        });
      });
  }
}


export default UserStore;