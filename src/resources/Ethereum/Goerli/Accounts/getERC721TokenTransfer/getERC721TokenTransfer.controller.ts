import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import Validate from '@/resources/Ethereum/Goerli/Accounts/getERC721TokenTransfer/getERC721TokenTransfer.validation';
import ERC721TxService from '@/resources/Ethereum/Goerli/Accounts/getERC721TokenTransfer/getERC721TokenTransfer.service';

class ERC721TxController implements Controller {
    public path = '/get-transaction-list';
    public router = Router();
    private ERC721TxService = new ERC721TxService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/erc721`,
            ValidationMiddleware(Validate.getERC721Tx),
            this.getERC721Tx
        )
    }

    private getERC721Tx = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { contractaddress, address } = req.body;
            res.status(200).json(await this.ERC721TxService.getERC721Tx(contractaddress, address));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default ERC721TxController;