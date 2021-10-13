import { Environment } from "./config";
import { IPClient } from "./ip_client";
import { ApiClient } from "./api_client";
export declare const createTestClients: (env: Environment, shouldLog: boolean) => [ApiClient, IPClient];
