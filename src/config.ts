const propertiesReader = require('properties-reader');

export type Environment = {
    ipServiceURL: string
    apiBaseURL: string
}

export type Config = {
    email: string
    password: string
    environment: Environment
};

enum Env {
    LOCAL,
    TEST,
    Production
}

export const getEnvironment = (env: Env): Environment => {
    switch(+env) {
        case Env.TEST:
            return TEST_ENVIRONMENT;
        case Env.Production:
            return PRODUCTION_ENVIRONMENT;
        default:
            return LOCAL_ENVIRONMENT;
    }
}

const LOCAL_ENVIRONMENT: Environment = {
    ipServiceURL: 'http://localhost:8081',
    apiBaseURL: 'http://localhost:8080'
}

const TEST_ENVIRONMENT: Environment = {
    ipServiceURL: 'http://34.141.25.42',
    apiBaseURL: 'https://dematerialised-dev.ey.r.appspot.com'
}

const PRODUCTION_ENVIRONMENT: Environment = {
    ipServiceURL: 'http://34.141.25.42',
    apiBaseURL: 'https://dematerialised-dev.ey.r.appspot.com'
}

export const config = (): Config => {
    let properties = propertiesReader('config.properties');
    const email = properties.get('email')
    const password = properties.get('password')
    const environment = properties.get('env')

    let env: Environment

    switch(environment) { 
        case 'local': { 
           env = LOCAL_ENVIRONMENT 
           break; 
        } 
        case 'test': { 
           env = TEST_ENVIRONMENT
           break; 
        } 
        default: { 
           throw new Error('unkown environment: ' + environment) 
        } 
     } 

    return {
        email: email,
        password: password,
        environment: env
    }
};