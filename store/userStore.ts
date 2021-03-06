import { configure, makeAutoObservable } from "mobx";
import { enableStaticRendering } from "mobx-react";
import { makePersistable, stopPersisting } from "mobx-persist-store";
import { IError, IUser, nullableTypes } from "../models";
import sendsay from "../api";
import { getCookie } from "../utils";
import { KEY_COOKIE } from "../const";
import { createContext } from "react";

configure({ enforceActions: "observed" });

const isServer = typeof window === "undefined";
enableStaticRendering(isServer);

export interface IUserState {
  login: nullableTypes<string>;
  sublogin: nullableTypes<string>;
  sessionKey: nullableTypes<string>;
}

export interface IUserResponse {
  login: nullableTypes<string>;
  sublogin: nullableTypes<string>;
  session: nullableTypes<string>;
}

class UserStore {
  user: IUserState = {
    login: null,
    sublogin: null,
    sessionKey: null,
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
      storage: typeof window === "undefined" ? undefined : window.localStorage,
    });
  }

  get errorMessage() {
    if (this.error.explain && this.error.id) {
      return `{id: "${this.error.id}", explain: "${this.error.explain}"}`;
    }
    return null;
  }

  stopStore() {
    stopPersisting(this);
  }

  hydrate(data: IUserState) {
    this.user =
      data != null ? data : { login: null, sublogin: null, sessionKey: null };
  }

  async signInRequest(data: IUser) {
    this.user.login = null;
    this.user.sublogin = null;
    this.loading = true;
    try {
      const res: IUserResponse = await sendsay.request({
        action: "login",
        ...data,
      });
      this.signInSuccess(res);
    } catch (e) {
      this.signInFailer(e as IError);
    }
  }

  signInSuccess(res: IUserResponse) {
    document.cookie = `${KEY_COOKIE}=${res.session}`;
    this.user.login = res.login;
    this.user.sublogin = res.sublogin;
    this.user.sessionKey = res.session;
    this.error.id = "";
    this.error.explain = "";
    this.loading = false;
  }

  signInFailer(e: IError) {
    this.error.id = e.id;
    this.error.explain = e.explain;
    this.loading = false;
  }

  logoutRequest() {
    sendsay
      .request({
        action: "logout",
        session: getCookie(KEY_COOKIE),
      })
      .then(() => {
        this.logoutSuccess()
      })
      .catch((e: IError) => {
        console.log(e)
        this.logoutFailer(e)
      });
  }

  logoutSuccess() {
    document.cookie = "";
    this.user.login = null;
    this.user.sublogin = null;
    this.user.sessionKey = null;
  }

  logoutFailer(e: IError) {
    this.error.id = e.id;
    this.error.explain = e.explain;
  }

  check() {
    sendsay
      .request({
        action: "pong",
        session: getCookie(KEY_COOKIE),
      })
      .catch(() => {
        this.logoutRequest();
      });
  }
}

export default UserStore;

export const UserStoreContext = createContext<UserStore | null>(null);
