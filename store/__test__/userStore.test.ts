import UserStore from "../userStore";

jest.mock("../../api/index");

describe("User Store", () => {
  it("signInSuccess", async () => {
    const store = new UserStore();
    store.stopStore();

    expect(store.user.login).toBeNull();
    expect(store.user.sublogin).toBeNull();
    expect(store.loading).toBe(false);

    await store.signInRequest({
      login: "test-login",
      sublogin: "test-sublogin",
      passwd: "test-passwd",
    });

    expect(store.user.login).toBe("test-login");
    expect(store.user.sublogin).toBe("test-sublogin");
    expect(store.loading).toBe(false);
  });
});
