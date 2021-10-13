export declare type Environment = {
    ipServiceURL: string;
    apiBaseURL: string;
};
export declare type Config = {
    email: string;
    password: string;
    environment: Environment;
};
declare enum Env {
    LOCAL = 0,
    TEST = 1,
    Production = 2
}
export declare const getEnvironment: (env: Env) => Environment;
export declare const config: () => Config;
export {};
