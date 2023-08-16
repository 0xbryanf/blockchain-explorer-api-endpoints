import {ApiParams} from '@/resources/Polygon/Polygon zkevm Testnet/Accounts/getInternalTxByHash/getInternalTxByHash.interface';
import HttpException from '@/utils/exceptions/http.exception';
import axios, { AxiosResponse } from 'axios';

const apiKey: string = process.env.POLYGON_API_KEY!;
const apiUrl: string = process.env.POLYGON_ZKEVM_TESTNET_API_URL!;

class PolyZKEVMTestnetTxByHashService {
    public async getTxByHash(txHash: string): Promise<string | Error> {
        try {
            const params: ApiParams = {
                module: 'account',
                action: 'txlistinternal',
                txHash: txHash,
                apiKey: apiKey,
            }

            const response: AxiosResponse = await axios.get(apiUrl, { params });
            if (response.data.status === '1') {
                return response.data.result;
            } else {
                throw new Error(`Error: ${response.data.message}`);
            }
        } catch (error:any) {
            throw new HttpException(500, error);
        }
    }
}

export default PolyZKEVMTestnetTxByHashService;