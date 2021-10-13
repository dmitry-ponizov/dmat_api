import { Token } from "./models";
export interface TokenStore {
    getToken(): Token | undefined;
    setToken(token: Token): void;
    clearToken(): void;
}
export declare class MemoryTokenStore implements TokenStore {
    token?: Token;
    getToken(): Token | undefined;
    setToken(token: Token): void;
    clearToken(): void;
}
