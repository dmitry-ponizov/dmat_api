import { Token } from "./models";

export interface TokenStore {
  getToken(): Token | undefined;
  setToken(token: Token): void;
  clearToken(): void;
}

export class MemoryTokenStore implements TokenStore {
  token?: Token;

  getToken(): Token | undefined {
    return this.token;
  }

  setToken(token: Token): void {
    this.token = token;
  }

  clearToken(): void {
    this.token = undefined;
  }
}
