import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import Validate from '@/resources/Ethereum/Goerli/Transactions/getTxReceiptStatus/getTxReceiptStatus.validation';
import TxReceiptStatusService from '@/resources/Ethereum/Goerli/Transactions/getTxReceiptStatus/getTxReceiptStatus.service';

class TxReceiptStatusController implements Controller {
    public path = '/get-transaction-receipt';
    public router = Router();
    private TxReceiptStatusService = new TxReceiptStatusService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/status`,
            ValidationMiddleware(Validate.getTxReceiptStatus),
            this.getTxReceiptStatus
        )
    }

    private getTxReceiptStatus = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { txHash } = req.body;
            res.status(200).json(await this.TxReceiptStatusService.getTxReceiptStatus(txHash));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default TxReceiptStatusController;