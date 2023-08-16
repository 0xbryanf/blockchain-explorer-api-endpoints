import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import Validate from '@/resources/Polygon/Polygon zkevm Testnet/Accounts/getERC20TokenTransfer/getERC20TokenTransfer.validation';
import PolyZKEVMTestnetERC721TxService from '@/resources/Polygon/Polygon zkevm Testnet/Accounts/getERC721TokenTransfer/getERC721TokenTransfer.service';

class PolyZKEVMTestnetERC721TxController implements Controller {
    public path = '/polygon-zkevm-testnet';
    public router = Router();
    private PolyZKEVMTestnetERC721TxService = new PolyZKEVMTestnetERC721TxService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/get-erc721tx`,
            ValidationMiddleware(Validate.getERC20Tx),
            this.getERC20Tx
        )
    }

    private getERC20Tx = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { contractaddress } = req.body;
            res.status(200).json(await this.PolyZKEVMTestnetERC721TxService.getERC20Tx(contractaddress));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default PolyZKEVMTestnetERC721TxController;