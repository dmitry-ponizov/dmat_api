import { Environment } from "./config";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { TokenStore } from "./token_store";
import { Token, User } from "./models";
import { UserList, UserTokenRole } from './models';
export interface Authenticator {
    signIn(email: string, password: string, audiences: Array<String>, baseUrl: string): Promise<Token>;
    refreshToken(refreshToken: string): Promise<Token>;
    getToken(): Token | undefined;
    addAuthHeader(config: AxiosRequestConfig): any;
}
export declare class IPClient implements Authenticator {
    private env;
    private tokenStore;
    private shouldLog;
    adminIPClient: import("axios").AxiosInstance;
    publicIPClient: import("axios").AxiosInstance;
    constructor(env: Environment, tokenStore: TokenStore, shouldLog: boolean);
    register(email: string, password: string): Promise<User>;
    signIn(email: string, password: string, audiences: Array<String>): Promise<Token>;
    refreshToken(refreshToken: string): Promise<Token>;
    verify(token: string): Promise<UserTokenRole>;
    setRole(userId: string, role: string): Promise<AxiosResponse>;
    allUsers(): Promise<UserList>;
    getUserById(userid: string): Promise<User>;
    getToken(): Token | undefined;
    addAuthHeader: (config: AxiosRequestConfig) => void;
}
