import { AxiosResponse } from "axios";
import { Authenticator } from "./ip_client";
import { CreateNFTRequest, CreateNFTResponse, CreateUCTRequest, CreateUsecaseRequest, MeResponse, UCT, UpdateNFTRequest, UpdateUCTRequest, Usecase } from "./models";
import { Environment } from "./config";
export declare class ApiClient {
    private env;
    private autherticator;
    private shouldLog;
    adminApiClient: import("axios").AxiosInstance;
    publicApiClient: import("axios").AxiosInstance;
    constructor(env: Environment, autherticator: Authenticator, shouldLog: boolean);
    me(): Promise<MeResponse>;
    createNFT(body: CreateNFTRequest): Promise<CreateNFTResponse>;
    updateNFT(id: string, body: UpdateNFTRequest): Promise<CreateNFTResponse>;
    getAllNFTs(): Promise<AxiosResponse>;
    getNFTById(id: string): Promise<AxiosResponse>;
    createUCT(body: CreateUCTRequest): Promise<UCT>;
    updateUCT(id: string, body: UpdateUCTRequest): Promise<UCT>;
    getAllUCTs(): Promise<AxiosResponse>;
    getUCTById(id: string): Promise<UCT>;
    createUsecase(itemId: string, body: CreateUsecaseRequest): Promise<Usecase>;
}
