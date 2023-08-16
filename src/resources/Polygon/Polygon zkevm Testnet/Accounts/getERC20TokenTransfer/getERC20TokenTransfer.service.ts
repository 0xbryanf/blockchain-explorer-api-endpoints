import { ApiParams } from '@/resources/Polygon/Polygon zkevm Testnet/Accounts/getERC20TokenTransfer/getERC20TokenTransfer.interface';
import HttpException from '@/utils/exceptions/http.exception';
import axios, { AxiosResponse } from 'axios';

const apiKey: string = process.env.POLYGON_API_KEY!;
const apiUrl: string = process.env.POLYGON_ZKEVM_TESTNET_API_URL!;

class PolyZKEVMTestnetERC20TxService {
    public async getERC20Tx(contractaddress: string): Promise<string[] | Error> {
        try {
            const params: ApiParams = {
                module: 'account',
                action: 'tokentx',
                contractaddress: contractaddress,
                page: 1,
                offset: 100,
                sort: 'asc',
                apiKey: apiKey,
            }
            const response: AxiosResponse = await axios.get(apiUrl, { params });
            console.log(response)
            if (response.data.status === '1') {
                const transactions = response.data.result;
                const formattedTransactions: string[] = transactions.map((transaction: string) => {
                    return transaction;
                })
                return formattedTransactions;
            } else {
                throw new Error(`Error: ${response.data.message}`);
            }
        } catch (error) {
            throw new HttpException(500, 'Unable to get the list of transactions.');
        }
    }
}

export default PolyZKEVMTestnetERC20TxService;