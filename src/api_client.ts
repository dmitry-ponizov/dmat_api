import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { addLogger, validateRequestStatusCode } from "./axios_helper";
import { Authenticator } from "./ip_client";
import {
  CreateNFTRequest,
  CreateNFTResponse,
  CreateUCTRequest,
  CreateUsecaseRequest,
  MeResponse,
  UCT,
  UpdateNFTRequest,
  UpdateUCTRequest,
  Usecase,
} from "./models";
import { Environment } from "./config";

export class ApiClient {
  /*
       client that requires a token
   */
  adminApiClient = addLogger(
    axios.create({
      validateStatus: validateRequestStatusCode,
      baseURL: this.env.apiBaseURL,
      headers: { "Content-Type": "application/json" },
    }),
    this.shouldLog
  );

  /*
        client that targets public api
    */
  publicApiClient = addLogger(
    axios.create({
      validateStatus: validateRequestStatusCode,
      baseURL: this.env.apiBaseURL,
      headers: { "Content-Type": "application/json" },
    }),
    this.shouldLog
  );

  constructor(
    private env: Environment,
    private autherticator: Authenticator,
    private shouldLog: boolean
  ) {
    // set auth header
    this.adminApiClient.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        autherticator.addAuthHeader(config);
        return config;
      }
    );

    // refresh token on expired
    this.adminApiClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const originalRequest = error.config;
        let token = this.autherticator.getToken();
        if (error.response.status === 401 && !originalRequest._retry && token) {
          originalRequest._retry = true;
          return this.autherticator
            .refreshToken(token.refreshToken)
            .then((response) => {
              autherticator.addAuthHeader(originalRequest);
              return axios(originalRequest);
            });
        }

        return Promise.reject(error);
      }
    );
  }

  /*
        me

        get the user behind the token
    */
  async me(): Promise<MeResponse> {
    return await this.adminApiClient.get("/api/users/me").then((response) => {
      return response.data;
    });
  }

  /*
        createNFT

        creates a NFT
     */
  async createNFT(body: CreateNFTRequest): Promise<CreateNFTResponse> {
    return await this.adminApiClient
      .post("/api/nfts", body)
      .then((response) => {
        return response.data;
      });
  }

  /*
       updateNFT

       updates a NFT
    */
  async updateNFT(
    id: string,
    body: UpdateNFTRequest
  ): Promise<CreateNFTResponse> {
    return await this.adminApiClient
      .patch("/api/nfts/" + id, body)
      .then((response) => {
        return response.data;
      });
  }

  /*
        getAllNFTs

        lists all NFTs
     */
  async getAllNFTs(): Promise<AxiosResponse> {
    return await this.adminApiClient.get("/api/nfts").then((response) => {
      return response.data;
    });
  }

  /*
        getNFTById

        get NFT by id
     */
  async getNFTById(id: string): Promise<AxiosResponse> {
    return await this.adminApiClient.get("/api/nfts/" + id).then((response) => {
      return response.data;
    });
  }

  /*
        createUCT

        creates an UCT
     */
  async createUCT(body: CreateUCTRequest): Promise<UCT> {
    return await this.adminApiClient
      .post("/api/ucts", body)
      .then((response) => {
        return response.data;
      });
  }

  /*
       updateUCT

       updates an UCT
    */
  async updateUCT(id: string, body: UpdateUCTRequest): Promise<UCT> {
    return await this.adminApiClient
      .patch("/api/ucts/" + id, body)
      .then((response) => {
        return response.data;
      });
  }

  /*
        getAllUCTs

        lists all UCTs
     */
  async getAllUCTs(): Promise<AxiosResponse> {
    return await this.adminApiClient.get("/api/ucts").then((response) => {
      return response.data;
    });
  }

  /*
        getUCTById

        gets ab UCT by id
     */
  async getUCTById(id: string): Promise<UCT> {
    return await this.adminApiClient.get("/api/ucts/" + id).then((response) => {
      return response.data;
    });
  }

  /*
        createNFT

        creates a NFT

        POST api/nfts/{itemId}/ucs
     */
  async createUsecase(
    itemId: string,
    body: CreateUsecaseRequest
  ): Promise<Usecase> {
    return await this.adminApiClient
      .post("/api/nfts/" + itemId + "/ucs", body)
      .then((response) => {
        return response.data;
      });
  }
}
