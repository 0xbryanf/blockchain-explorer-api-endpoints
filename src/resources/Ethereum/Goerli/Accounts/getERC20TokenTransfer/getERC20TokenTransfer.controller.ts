import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import Validate from '@/resources/Ethereum/Goerli/Accounts/getERC20TokenTransfer/getERC20TokenTransfer.validation';
import ERC20TxService from '@/resources/Ethereum/Goerli/Accounts/getERC20TokenTransfer/getERC20TokenTransfer.service';

class ERC20TxController implements Controller {
    public path = '/get-transaction-list';
    public router = Router();
    private ERC20TxService = new ERC20TxService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/erc20`,
            ValidationMiddleware(Validate.getERC20Tx),
            this.getERC20Tx
        )
    }

    private getERC20Tx = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { contractaddress, address } = req.body;
            res.status(200).json(await this.ERC20TxService.getERC20Tx(contractaddress, address));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default ERC20TxController;