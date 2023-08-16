import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import Validate from '@/resources/Polygon/Polygon zkevm Testnet/Accounts/getERC20TokenTransfer/getERC20TokenTransfer.validation';
import PolyZKEVMTestnetERC20TxService from '@/resources/Polygon/Polygon zkevm Testnet/Accounts/getERC20TokenTransfer/getERC20TokenTransfer.service';

class PolyZKEVMTestnetERC20TxController implements Controller {
    public path = '/polygon-zkevm-testnet';
    public router = Router();
    private PolyZKEVMTestnetERC20TxService = new PolyZKEVMTestnetERC20TxService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/get-erc20tx`,
            ValidationMiddleware(Validate.getERC20Tx),
            this.getERC20Tx
        )
    }

    private getERC20Tx = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { contractaddress } = req.body;
            res.status(200).json(await this.PolyZKEVMTestnetERC20TxService.getERC20Tx(contractaddress));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default PolyZKEVMTestnetERC20TxController;