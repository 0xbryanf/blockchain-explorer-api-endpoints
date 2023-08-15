import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import Validate from '@/resources/Ethereum/Goerli/Transactions/getTxReceiptStatus/getTxReceiptStatus.validation';
import GoerliTxReceiptStatusService from '@/resources/Ethereum/Goerli/Transactions/getTxReceiptStatus/getTxReceiptStatus.service';

class GoerliTxReceiptStatusController implements Controller {
    public path = '/goerli';
    public router = Router();
    private GoerliTxReceiptStatusService = new GoerliTxReceiptStatusService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/get-txreceipt`,
            ValidationMiddleware(Validate.getTxReceiptStatus),
            this.getTxReceiptStatus
        )
    }

    private getTxReceiptStatus = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { txHash } = req.body;
            res.status(200).json(await this.GoerliTxReceiptStatusService.getTxReceiptStatus(txHash));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default GoerliTxReceiptStatusController;