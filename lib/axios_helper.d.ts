import { AxiosInstance } from "axios";
export declare function addLogger(axiosInstance: AxiosInstance, log: boolean): AxiosInstance;
export declare const validateRequestStatusCode: (status: number) => boolean;
