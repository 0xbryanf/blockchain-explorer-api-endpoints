import {ApiParams} from "@/resources/Polygon/Polygon zkevm Testnet/Accounts/getBalance/getBalance.interface";
import HttpException from "@/utils/exceptions/http.exception";
import axios, { AxiosResponse } from 'axios';
import { ethers } from 'ethers';

const apiKey: string = process.env.POLYGON_API_KEY!;
const apiUrl: string = process.env.POLYGON_ZKEVM_TESTNET_API_URL!;

class PolyZKEVMTestnetBalanceService {
    public async getBalance(address: string): Promise<string | Error> {
        try {
            const params: ApiParams = {
                module: 'account',
                action: 'balance',
                address: address,
                apiKey: apiKey
            };
            const response: AxiosResponse = await axios.get(apiUrl, { params });
            if (response.data.status === '1') {
                return ethers.formatEther(response.data.result);
            } else {
                throw new Error(`Error: ${response.data.message}`);
            }
        } catch (error) {
            throw new HttpException(500, 'Unable to get balance.');
        }
    }
}

export default PolyZKEVMTestnetBalanceService;