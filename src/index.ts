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
import ContractStatusController from '@/resources/Ethereum/Goerli/Transactions/getContractStatus/getContractStatus.controller';
import TxReceiptStatusController from '@/resources/Ethereum/Goerli/Transactions/getTxReceiptStatus/getTxReceiptStatus.controller';
import BlockNumberController from '@/resources/Ethereum/Goerli/Blocks/getBlockNumber/getBlockNumber.controller';
import EthTotalSupplyController from '@/resources/Ethereum/Goerli/Stats/getEthTotalSupply/getEthTotalSupply.controller';
import EthLatestPriceController from '@/resources/Ethereum/Goerli/Stats/getEthLatestPrice/getEthLatestPrice.controller';
import ERC20TokenAccntBalController from '@/resources/Ethereum/Goerli/Tokens/getERC20TokenAccountBalance/getERC20TokenAccntBal.controller';
import ERC20TokenTotalSupplyController from '@/resources/Ethereum/Goerli/Tokens/getERC20TokenTotalSupply/getERC20TokenTotalSupply.controller';
validateEnv();
const app = new App([
    new BalanceController(),
    new TxListNormalController(),
    new TxListInternalController(),
    new TxByHashController(),
    new TxByBlockRangeController(),
    new ERC20TxController(),
    new ERC721TxController(),
    new ContractStatusController(),
    new TxReceiptStatusController(),
    new BlockNumberController(),
    new EthTotalSupplyController(),
    new EthLatestPriceController(),
    new ERC20TokenAccntBalController(),
    new ERC20TokenTotalSupplyController(),
], Number(process.env.port));
app.listen();