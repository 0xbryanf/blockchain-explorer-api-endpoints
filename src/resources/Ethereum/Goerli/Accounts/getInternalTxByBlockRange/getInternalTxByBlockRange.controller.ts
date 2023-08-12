import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import Validate from '@/resources/Ethereum/Goerli/Accounts/getInternalTxByBlockRange/getInternalTxByBlockRange.validation';
import TxByBlockRangeService from '@/resources/Ethereum/Goerli/Accounts/getInternalTxByBlockRange/getInternalTxByBlockRange.service';

class TxByBlockRangeController implements Controller {
    public path = '/get-transaction/internal';
    public router = Router();
    private TxByBlockRangeService = new TxByBlockRangeService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/byblockrange`,
            ValidationMiddleware(Validate.getTxByBlockRange),
            this.getTxByBlockRange
        )
    }

    private getTxByBlockRange = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { startblock, endblock } = req.body;
            res.status(200).json(await this.TxByBlockRangeService.getTxByBlockRange(startblock, endblock));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default TxByBlockRangeController;