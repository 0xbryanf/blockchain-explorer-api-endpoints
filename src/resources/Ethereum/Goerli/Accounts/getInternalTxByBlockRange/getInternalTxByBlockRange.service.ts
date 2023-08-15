import { ApiParams } from '@/resources/Ethereum/Goerli/Accounts/getInternalTxByBlockRange/getInternalTxByBlockRange.interface';
import HttpException from '@/utils/exceptions/http.exception';
import axios, { AxiosResponse } from 'axios';

const apiKey: string = process.env.ETHERSCAN_API_KEY!;
const apiUrl: string = process.env.GOERLI_API_URL!;

class GoerliTxByBlockRangeService {
    public async getTxByBlockRange(startblock: number, endblock: number): Promise<string | Error> {
        try {
            const params: ApiParams = {
                module: 'account',
                action: 'txlistinternal',
                startblock: startblock,
                endblock: endblock,
                page: 1,
                offset: 10,
                sort: 'asc',
                apiKey: apiKey
            }

            const response: AxiosResponse = await axios.get(apiUrl, { params });
            if (response.data.status === '1') {
                return response.data.result;
            } else {
                throw new Error(`Error: ${response.data.message}`);
            }
        } catch (error) {
            throw new HttpException(500, 'Unable to get the transaction details.');
        }
    }
}

export default GoerliTxByBlockRangeService;