import {Config, Environment} from "./config";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { TokenStore } from "./token_store";
import { Token, User } from "./models";
import {addLogger, validateRequestStatusCode} from "./axios_helper";
import { UserList, UserTokenRole } from './models'


export interface Authenticator {
    signIn(email: string, password: string, audiences: Array<String>, baseUrl: string): Promise<Token>
    refreshToken(refreshToken: string): Promise<Token>
    getToken(): Token | undefined
    addAuthHeader(config: AxiosRequestConfig): any
}

export class IPClient implements Authenticator {
    /*
        client that requires a token
    */
    adminIPClient = addLogger(axios.create({
        validateStatus: validateRequestStatusCode,
        baseURL: this.env.ipServiceURL,
        headers: { 'Content-Type': 'application/json' }
    }), this.shouldLog);

    /*
        client that targets public api
    */
    publicIPClient = addLogger(axios.create({
        validateStatus: validateRequestStatusCode,
        baseURL: this.env.ipServiceURL,
        headers: { 'Content-Type': 'application/json' }
    }), this.shouldLog);

    constructor(private env: Environment, private tokenStore: TokenStore, private shouldLog: boolean) {
        // set auth header
        this.adminIPClient.interceptors.request.use((config: AxiosRequestConfig) => { 
            this.addAuthHeader(config)
            return config;
        });

        // refresh token on expired
        this.adminIPClient.interceptors.response.use(
            (response) => { return response },
            (error) => {
                const originalRequest = error.config;
                let token = this.tokenStore.getToken()
                if (error.response.status === 401 && !originalRequest._retry && token) {
                    originalRequest._retry = true
                    return this.refreshToken(token.refreshToken)
                        .then(response => {
                            this.addAuthHeader(originalRequest)
                            return axios(originalRequest)
                        })
                }

                return Promise.reject(error);
            });
    }

    /*
        register
    
        registers a user by providing
        email
        password
    */
    async register(email: string, password: string): Promise<User> {
        return await this.publicIPClient.post('/api/v1/auth/register', {
            email: email,
            password: password
        }).then(response => {
            return response.data
        });
    }

    /*
        signIn

        signs in a user by providing
        email
        password
        audiences   - the resource services that will receive the token
    */
    async signIn(email: string, password: string, audiences: Array<String>): Promise<Token> {
        return await this.publicIPClient.post('/api/v1/auth/token', {
            email: email,
            password: password,
            audiences: audiences
        }).then(response => {
            const token = response.data
            this.tokenStore.setToken(token)
            return token
        });
    }

    /*
        refreshToken
    
        refreshes the token with refreshToken when token has expired
    */
    async refreshToken(refreshToken: string): Promise<Token> {
        return await this.publicIPClient.post('/api/v1/auth/token/refresh', {
            refreshToken: refreshToken,
        }).then(response => {
            const token = response.data
            this.tokenStore.setToken(token)
            return token
        });
    }

    /*
        verify
    
        receives the userId, role =[admin, basic], audiences in exchange for a token
    */
    async verify(token: string): Promise<UserTokenRole> {
        return await this.publicIPClient.post('/api/v1/auth/token/verify', {
            token: token
        }).then(response => {
            return response.data
        });
    }

    /////////////////////////////////////////////////////////////////////
    //
    // Users Endpoints
    //
    /////////////////////////////////////////////////////////////////////

    /*
        setRole

        if user is admin then it can set a role of another user.
        The role must be either admin or basic
    */
    async setRole(userId: string, role: string): Promise<AxiosResponse> {
        return await this.adminIPClient.put('/api/v1/auth/role', {
            userId: userId,
            role: role
        });
    }


    /*
        allUsers

        if user is admin then it can call all users
    */
    async allUsers(): Promise<UserList> {
        return await this.adminIPClient.get('/api/v1/users').then(response => {
            return response.data
        });
    }


    /*
        getUserById
    
        if user is admin then it can call all users
    */
    async getUserById(userid: string): Promise<User> {
        return await this.adminIPClient.get('/api/v1/users/' + userid).then(response => {
            return response.data
        });
    }

    getToken(): Token | undefined {
        return this.tokenStore.getToken()
    }

    /*
        adding an authorisation header with token
    */
    addAuthHeader = (config: AxiosRequestConfig) => {
        let token = this.tokenStore.getToken()
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token.token;
        }
    }
}