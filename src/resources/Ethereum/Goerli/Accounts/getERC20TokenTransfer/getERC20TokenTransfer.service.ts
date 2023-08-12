import { ApiParams } from '@/resources/Ethereum/Goerli/Accounts/getERC20TokenTransfer/getERC20TokenTransfer.interface';
import HttpException from '@/utils/exceptions/http.exception';
import axios, { AxiosResponse } from 'axios';

const apiKey: string = process.env.ETHERSCAN_API_KEY!;
const apiUrl: string = process.env.ETHERSCAN_API_URL!;

class ERC20TxService {
    public async getERC20Tx(contractaddress: string, address: string): Promise<string[] | Error> {
        try {
            const params: ApiParams = {
                module: 'account',
                action: 'tokentx',
                contractaddress: contractaddress,
                address: address,
                page: 1,
                offset: 10,
                startblock: 0,
                endblock: 99999999,
                sort: 'asc',
                apiKey: apiKey,
            }
            const response: AxiosResponse = await axios.get(apiUrl, { params });
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

export default ERC20TxService;