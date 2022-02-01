class Sendsay {
  user = {
    login: "test-login",
    sublogin: "test-sublogin",
    passwd: "test-passwd",
  };

  session = "test-session";

  error = {
    id: "test-id",
    explain: "test-explain",
  };

  async request(data) {
    switch (data.action) {
      case "login":
        if (
          data.login === this.user.login &&
          data.passwd === this.user.passwd
        ) {
          return new Promise((resolve) => {
            console.log("Called mocked auth");
            process.nextTick(() => resolve(this.user));
          });
        } else {
          return new Promise((resolve, reject) => {
            process.nextTick(() => reject(this.error));
          });
        }
      default:
        return;
    }
  }
}

const sendsay = new Sendsay();

export default sendsay;
