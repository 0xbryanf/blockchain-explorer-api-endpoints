import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import Validate from '@/resources/Ethereum/Goerli/Accounts/getInternalTxByHash/getInternalTxByHash.validation';
import GoerliTxByHashService from '@/resources/Ethereum/Goerli/Accounts/getInternalTxByHash/getInternalTxByHash.service';

class GoerliTxByHashController implements Controller {
    public path = '/goerli';
    public router = Router();
    private GoerliTxByHashService = new GoerliTxByHashService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/get-internaltx-byhash`,
            ValidationMiddleware(Validate.getTxByHash),
            this.getTxListInternal
        )
    }

    private getTxListInternal = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { txHash } = req.body;
            res.status(200).json(await this.GoerliTxByHashService.getTxByHash(txHash));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default GoerliTxByHashController;