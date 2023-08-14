import {ApiParams} from "@/resources/Ethereum/Goerli/Stats/getEthLatestPrice/getEthLatestPrice.interface";
import HttpException from "@/utils/exceptions/http.exception";
import axios, { AxiosResponse } from 'axios';

const apiKey: string = process.env.ETHERSCAN_API_KEY!;
const apiUrl: string = process.env.ETHERSCAN_API_URL!;

class EthLatestPriceService {
    public async getEthLatestPrice(): Promise<string | Error> {
        try {
            const params: ApiParams = {
                module: 'stats',
                action: 'ethprice',
                apikey: apiKey
            };
            const response: AxiosResponse = await axios.get(apiUrl, { params });
            console.log(response)
            if (response.data.status === '1') {
                return response.data.result;
            } else {
                throw new Error(`Error: ${response.data.message}`);
            }
        } catch (error) {
            throw new HttpException(500, 'Unable to get Eth latest price.');
        }
    }
}

export default EthLatestPriceService;