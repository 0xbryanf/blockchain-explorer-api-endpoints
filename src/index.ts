import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/validateEnv';
import GoerliBalanceController from '@/resources/Ethereum/Goerli/Accounts/getBalance/getBalance.controller';
import GoerliTxListNormalController from '@/resources/Ethereum/Goerli/Accounts/getTxListNormal/getTxListNormal.controller';
import GoerliTxListInternalController from '@/resources/Ethereum/Goerli/Accounts/getTxListInternal/getTxListInternal.controller';
import GoerliTxByHashController from '@/resources/Ethereum/Goerli/Accounts/getInternalTxByHash/getInternalTxByHash.controller';
import GoerliTxByBlockRangeController from '@/resources/Ethereum/Goerli/Accounts/getInternalTxByBlockRange/getInternalTxByBlockRange.controller';
import GoerliERC20TxController from '@/resources/Ethereum/Goerli/Accounts/getERC20TokenTransfer/getERC20TokenTransfer.controller';
import GoerliERC721TxController from '@/resources/Ethereum/Goerli/Accounts/getERC721TokenTransfer/getERC721TokenTransfer.controller';
import GoerliContractStatusController from '@/resources/Ethereum/Goerli/Transactions/getContractStatus/getContractStatus.controller';
import GoerliTxReceiptStatusController from '@/resources/Ethereum/Goerli/Transactions/getTxReceiptStatus/getTxReceiptStatus.controller';
import GoerliBlockNumberController from '@/resources/Ethereum/Goerli/Blocks/getBlockNumber/getBlockNumber.controller';
import GoerliEthTotalSupplyController from '@/resources/Ethereum/Goerli/Stats/getEthTotalSupply/getEthTotalSupply.controller';
import GoerliEthLatestPriceController from '@/resources/Ethereum/Goerli/Stats/getEthLatestPrice/getEthLatestPrice.controller';
import GoerliERC20TokenAccntBalController from '@/resources/Ethereum/Goerli/Tokens/getERC20TokenAccountBalance/getERC20TokenAccntBal.controller';
import GoerliERC20TokenTotalSupplyController from '@/resources/Ethereum/Goerli/Tokens/getERC20TokenTotalSupply/getERC20TokenTotalSupply.controller';
import PolyZKEVMTestnetBalanceController from '@/resources/Polygon/Polygon zkevm Testnet/Accounts/getBalance/getBalance.controller';
import PolyZKEVMTestnetERC20TxController from '@/resources/Polygon/Polygon zkevm Testnet/Accounts/getERC20TokenTransfer/getERC20TokenTransfer.controller';
import PolyZKEVMTestnetERC721TxController from '@/resources/Polygon/Polygon zkevm Testnet/Accounts/getERC721TokenTransfer/getERC721TokenTransfer.controller';
import PolyZKEVMTestnetTxByBlockRangeController from '@/resources/Polygon/Polygon zkevm Testnet/Accounts/getInternalTxByBlockRange/getInternalTxByBlockRange.controller';
import PolyZKEVMTestnetTxByHashController from '@/resources/Polygon/Polygon zkevm Testnet/Accounts/getInternalTxByHash/getInternalTxByHash.controller';
import PolyZKEVMTestnetTxListInternalController from '@/resources/Polygon/Polygon zkevm Testnet/Accounts/getTxListInternal/getTxListInternal.controller';
import PolyZKEVMTxListNormalController from '@/resources/Polygon/Polygon zkevm Testnet/Accounts/getTxListNormal/getTxListNormal.controller';
validateEnv();
const app = new App([
    new GoerliBalanceController(),
    new GoerliTxListNormalController(),
    new GoerliTxListInternalController(),
    new GoerliTxByHashController(),
    new GoerliTxByBlockRangeController(),
    new GoerliERC20TxController(),
    new GoerliERC721TxController(),
    new GoerliContractStatusController(),
    new GoerliTxReceiptStatusController(),
    new GoerliBlockNumberController(),
    new GoerliEthTotalSupplyController(),
    new GoerliEthLatestPriceController(),
    new GoerliERC20TokenAccntBalController(),
    new GoerliERC20TokenTotalSupplyController(),
    new PolyZKEVMTestnetBalanceController(),
    new PolyZKEVMTestnetERC20TxController(),
    new PolyZKEVMTestnetERC721TxController(),
    new PolyZKEVMTestnetTxByBlockRangeController(),
    new PolyZKEVMTestnetTxByHashController(),
    new PolyZKEVMTestnetTxListInternalController(),
    new PolyZKEVMTxListNormalController()
], Number(process.env.port));
app.listen();