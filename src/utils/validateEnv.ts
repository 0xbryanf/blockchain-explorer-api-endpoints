import { cleanEnv, str, port } from 'envalid';

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production']
        }),
        PORT: port({ default: 3000 }),
        ETHERSCAN_API_KEY: str(),
        GOERLI_API_URL: str(),
        POLYGON_API_KEY: str(),
        POLYGON_ZKEVM_TESTNET_API_URL: str()
    });
}

export default validateEnv;