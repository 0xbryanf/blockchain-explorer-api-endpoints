import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/validateEnv';
import BalanceController from '@/resources/Ethereum/Goerli/Accounts/getBalance/getBalance.controller';
import TxListNormalController from '@/resources/Ethereum/Goerli/Accounts/getTxListNormal/getTxListNormal.controller';
import TxListInternalController from '@/resources/Ethereum/Goerli/Accounts/getTxListInternal/getTxListInternal.controller';
import TxByHashController from '@/resources/Ethereum/Goerli/Accounts/getInternalTxByHash/getInternalTxByHash.controller';
import TxByBlockRangeController from '@/resources/Ethereum/Goerli/Accounts/getInternalTxByBlockRange/getInternalTxByBlockRange.controller';
import ERC20TxController from '@/resources/Ethereum/Goerli/Accounts/getERC20TokenTransfer/getERC20TokenTransfer.controller';
import ERC721TxController from '@/resources/Ethereum/Goerli/Accounts/getERC721TokenTransfer/getERC721TokenTransfer.controller';

validateEnv();
const app = new App([
    new BalanceController(),
    new TxListNormalController(),
    new TxListInternalController(),
    new TxByHashController(),
    new TxByBlockRangeController(),
    new ERC20TxController(),
    new ERC721TxController(),

], Number(process.env.port));
app.listen();