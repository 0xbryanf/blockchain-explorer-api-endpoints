import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import Validate from '@/resources/Ethereum/Goerli/Accounts/getInternalTxByHash/getInternalTxByHash.validation';
import TxByHashService from '@/resources/Ethereum/Goerli/Accounts/getInternalTxByHash/getInternalTxByHash.service';

class TxByHashController implements Controller {
    public path = '/get-transaction/internal';
    public router = Router();
    private TxByHashService = new TxByHashService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/byhash`,
            ValidationMiddleware(Validate.getTxByHash),
            this.getTxListInternal
        )
    }

    private getTxListInternal = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { txHash } = req.body;
            res.status(200).json(await this.TxByHashService.getTxByHash(txHash));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default TxByHashController;