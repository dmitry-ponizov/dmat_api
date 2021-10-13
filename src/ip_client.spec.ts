import { IPClient } from "./ip_client";
import { MemoryTokenStore } from "./token_store";
var randomEmail = require("random-email");
import { expect } from "chai";
import { User, Token } from "./models";
import { Role } from "./models";

var assert = require("assert");

describe("IP Client", function () {
  let ipClient: IPClient;
  let tokenStore = new MemoryTokenStore();
  const adminEmail = randomEmail();
  const adminPassword = "asdnajn23dfna";
  let adminUserId = "";

  beforeAll(() => {
    const env = {
      ipServiceURL: "http://localhost:8080",
      apiBaseURL: "",
    };
    ipClient = new IPClient(env, tokenStore, false);
  });

  describe("register", function () {
    it("should register user", async function () {
      const user = await ipClient
        .register(adminEmail, adminPassword)
        .catch((e) => {
          assert.fail(e.code);
        });

      if (!user) {
        expect.fail("user should not be null");
      }
      expect((<User>user).id).to.be.a("string");
      expect((<User>user).email).to.equal(adminEmail);

      // store for later
      adminUserId = (<User>user).id;
    });
  });

  describe("signin", function () {
    it("should signin user", async function () {
      const token = await ipClient
        .signIn(adminEmail, adminPassword, ["audience"])
        .catch((e) => {
          assert.fail(e.code);
        });
    });
  });

  describe("verify", function () {
    it("should verify token", async function () {
      await ipClient
        .signIn(adminEmail, adminPassword, ["audience"])
        .then((token) => {
          return ipClient.verify(token.token);
        })
        .then(
          (r) => {
            expect(r.id).to.equal(adminUserId);
            expect(r.role).to.equal(Role.ADMIN);
            expect(r.audiences).to.be.an("array").that.includes("audience");
          },
          (e) => {
            expect.fail(e);
          }
        );
    });
  });

  describe("refresh", function () {
    it("should fail expired token with 401", async function () {
      //tokenStore.setToken(expiredToken)
      // await ipClient.allUsers().then(
      //     r => {expect.fail("request must fail, token should be expired")},
      //     e => {expect(e.response.status).to.equal(401)}
      // )
    });

    it("should refresh token", async function () {
      tokenStore.setToken(expiredToken);
      await ipClient.getUserById(adminUserId).then(
        (r) => {
          expect(r.email).to.equal(adminEmail);
          expect(r.role).to.equal(Role.ADMIN);
        },
        (e) => {
          expect.fail("token should be refreshed");
        }
      );
    });
  });

  describe("allusers", function () {
    it("should return at least one user", async function () {
      await ipClient
        .signIn(adminEmail, adminPassword, ["audience"])
        .catch((e) => {
          assert.fail(e.code);
        });
      await ipClient.allUsers().then(
        (r) => {
          expect(r.users.length).to.be.greaterThan(0);
        },
        (e) => {
          expect.fail("all users should be returned");
        }
      );
    });
  });

  describe("getUserById", function () {
    it("should return the registered user", async function () {
      await ipClient
        .signIn(adminEmail, adminPassword, ["audience"])
        .catch((e) => {
          assert.fail(e.code);
        });
      await ipClient.getUserById(adminUserId).then(
        (r) => {
          expect(r.email).to.equal(adminEmail);
          expect(r.role).to.equal(Role.ADMIN);
        },
        (e) => {
          expect.fail("the registered users was not returned");
        }
      );
    });
  });

  describe("setRole", function () {
    it("admin should be able to change role of another user", async function () {
      let newUserId = "";
      await ipClient
        .register(randomEmail(), "293e89384")
        .then((user) => {
          newUserId = user.id;
        })
        .catch((e) => {
          assert.fail(e.code);
        });

      await ipClient
        .signIn(adminEmail, adminPassword, ["localhost:9090"])
        .catch((e) => {
          assert.fail(e.code);
        });
      await ipClient.setRole(newUserId, Role.ADMIN).catch((e) => {
        assert.fail(e.code);
      });

      await ipClient
        .getUserById(newUserId)
        .then((user) => {
          expect(user.id).to.equal(newUserId);
          expect(user.role).to.equal(Role.ADMIN);
        })
        .catch((e) => {
          expect.fail(e);
        });
    });
  });
});

const expiredToken = {
  token:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOltdLCJhdWQiOlsiYXVkaWVuY2UiXSwicm9sZSI6ImJhc2ljIiwiZXhwIjoxNjMzMzYyNTMyLCJqdGkiOiI4OTc4OTkzZi03MmM5LTQ2YjktODM2OC1lYzQ0M2NhYWNhYmYiLCJpYXQiOjE2MzMzNjI1MTIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCIsInN1YiI6ImJlZWJlYzA2LTBkNzQtNDY0NC05OGMyLWI0MGFlNjNmZDIxMSJ9.fIVIBAzE6M7QtnHmnqrBiji5eW_9vwgQuM8FfMz0tq73s7kxEHhfEepu3_mD1AOOcmuRTh3295QIDIAxIvjifIpmdbnDRcYBfXXfrP4TJAMk8Hu4XiyPLGyXiYvyoOre1kk7uHtbVw5jyQasEQvzJoACT_PSB0nzAuwHobR1fCmNLVBCHFn6ykV5uQdD-xcNY2YPNbSszEtx3Qt6LW0AvLvpV4UCiuqr4S-eRyuS6tfT0X6vso2mOgJZLywidSGX7UYfXoXozD0Fp6IFP3wucNCEbPLOYuo_7kwS7BOWKo6FjI324dm62avcumAqVquGJAiRmmiBaore2dRd-VQTZ22kEKVsHwsp2fVfk7jOTSoY8QYTmOMs3cDG9wk-VKVuTlKDiuFHG64pzWybB6vvgS4NX7S9MMYStJqzvsKjadkkLq6rr2uGUerotwPlYxwviHp1NWymyne7IHLBdG239t1Lei1nGe1mKe9t-yM7H4mbitdEBo-sevyT9RHfBVPhRID18-tCJFzjzjPoS4yeSlcN2pmJfFZJmgTVgjZ3L7ZTUORFI85GrBqLvQZSj50v0UCOE5dhUk11kvZsmb95vGfbXL0YeQZOiR84gNeZDXT6xnGL-hW9TPnQZ6c5RK5glgill3a2YX9C_tE52mctZ0Y1Txd6SRJqRyzImImAwnI",
  refreshToken:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOltdLCJhdWQiOlsiYXVkaWVuY2UiXSwicm9sZSI6ImJhc2ljIiwiZXhwIjoyNjMzMzYyNTEyLCJqdGkiOiI3YTFlNWRmYi1jYmJlLTQ3YzgtYjBjNC0yOWM1NGNiZTNhMTMiLCJpYXQiOjE2MzMzNjI1MTIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCIsInN1YiI6ImJlZWJlYzA2LTBkNzQtNDY0NC05OGMyLWI0MGFlNjNmZDIxMSJ9.TV3_pw7EWnu_6YykyRcqD5LMg_JnBD3zapOSDVvXsJ2yWLQizg_-PyQR6FSkT8JfzWtl9MgtT3Q4bW28cfTV5MJX-5TDEZ-6fSoTm1gkeRkDXJLr_3_izc1Nh3UrzAHytfvAsLD0eQPBjjNxqmIaUjx8YU57mu_7jCTgb83bEfx3B2cnb6H4ZaIWklkLLYdz09hWuheSQAlIgQegzlipZsoWtNvY_7PLhHlmQ2uQ1esJ_3v2hfekf8cpGdj5sIEaKBCx8EPUJ_L54e4u-VPKsIfPy9w40fP9gaSEKpmL2pzxemiLaK9hMHQm3ogJrBS3AUOK9w0B4cVMWXVmz9Jp6EosPQNYXRAomEZQnNyyvylDW_j41ZUlT8cnPivfOPUfLffEd1W3RGkXw4sFL0zKzzPyEedLTDkZJSKSLtWwn9EMwujWXE8yFMOFQTYtBPhLcMqeBDm1sTU7tTrTkB5PAwaPX7XzEM6KXFNM5-6cAQpstQ1RqF3vtfg0OGEmbbSBaL8Sdhw82SfY4Oq8kCCkHN9km2Q3ZDhZ6KKA5Yk075T8CA0-vlz-txmcD_Q_knyB6TwGF0pTA3Oi-mpKLvqZmysDJ_jBMNx-7W7UEvBIKBHF8DUGcMNf3SW6Vs-oBbCYGLf_Ee0Ifa0giN77w6B8MWb2vmbmhnOkAKdtIQ8hhW4",
  expiresIn: 20,
  type: "bearer",
};
