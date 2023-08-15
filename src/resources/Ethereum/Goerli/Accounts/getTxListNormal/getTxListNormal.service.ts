import {ApiParams} from "@/resources/Ethereum/Goerli/Accounts/getTxListNormal/getTxListNormal.interface";
import HttpException from "@/utils/exceptions/http.exception";
import axios, { AxiosResponse } from 'axios';

const apiKey: string = process.env.ETHERSCAN_API_KEY!;
const apiUrl: string = process.env.GOERLI_API_URL!;

class GoerliTxListNormalService {
    public async getTxListNormal(address: string): Promise<string[] | Error> {
        try {
            const params: ApiParams = {
                module: 'account',
                action: 'txlist',
                address: address,
                startblock: 0,
                endblock: 99999999,
                page: 1,
                offset: 10,
                sort: 'asc',
                apiKey: apiKey,
            }
            const response: AxiosResponse = await axios.get(apiUrl, { params });
            if (response.data.status === '1') {
                const transactions = response.data.result;
                const formattedTransactions: string[] = transactions.map((transaction: string) => {
                    return transaction;
                })
                return formattedTransactions
            } else {
                throw new Error(`Error: ${response.data.message}`);
            }
        } catch (error) {
            throw new HttpException(500, 'Unable to get the list of transactions.')
        }
    }
}

export default GoerliTxListNormalService;