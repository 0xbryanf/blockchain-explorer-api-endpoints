import {ApiParams} from "@/resources/Ethereum/Goerli/Transactions/getContractStatus/getContractStatus.interface";
import HttpException from "@/utils/exceptions/http.exception";
import axios, { AxiosResponse } from 'axios';

const apiKey: string = process.env.ETHERSCAN_API_KEY!;
const apiUrl: string = process.env.GOERLI_API_URL!;

class GoerliContractStatusService {
    public async getContractStatus(txHash: string): Promise<string | Error> {
        try {
            const params: ApiParams = {
                module: 'transaction',
                action: 'getstatus',
                txhash: txHash,
                apikey: apiKey,
            }
            const response: AxiosResponse = await axios.get(apiUrl, { params });
            if (response.data.status === '1') {
                return response.data.result;
            } else {
                throw new Error(`Error: ${response.data.message}`);
            }
        } catch (error) {
            throw new HttpException(500, 'Unable to get contract status.');
        }
    }
}

export default GoerliContractStatusService;