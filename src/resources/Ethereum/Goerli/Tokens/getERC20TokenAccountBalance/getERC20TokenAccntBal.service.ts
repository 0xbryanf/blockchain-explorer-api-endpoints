import {ApiParams} from "@/resources/Ethereum/Goerli/Tokens/getERC20TokenAccountBalance/getERC20TokenAccntBal.interface";
import HttpException from "@/utils/exceptions/http.exception";
import axios, { AxiosResponse } from 'axios';
import { ethers } from 'ethers';

const apiKey: string = process.env.ETHERSCAN_API_KEY!;
const apiUrl: string = process.env.ETHERSCAN_API_URL!;

class ERC20TokenAccntBalService {
    public async getERC20TokenAccountBalance(contractAddress: string, address: string): Promise<string | Error> {
        try {
            const params: ApiParams = {
                module: 'account',
                action: 'tokenbalance',
                contractaddress: contractAddress,
                address: address,
                tag: 'latest',
                apikey: apiKey
            }
            const response: AxiosResponse = await axios.get(apiUrl, { params });
            if (response.data.status === '1') {
                return ethers.formatEther(response.data.result);
            } else {
                throw new Error(`Error: ${response.data.message}`);
            }
        } catch (error) {
            throw new HttpException(500, 'Unable to get ERC20 Token balance.');
        }
    }
}

export default ERC20TokenAccntBalService;