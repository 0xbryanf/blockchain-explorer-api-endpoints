import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import Validate from '@/resources/Ethereum/Goerli/Accounts/getTxListInternal/getTxListInternal.validation';
import TxListInternalService from '@/resources/Ethereum/Goerli/Accounts/getTxListInternal/getTxListInternal.service';

class TxListInternalController implements Controller {
    public path = '/get-transaction-list';
    public router = Router();
    private TxListInternalService = new TxListInternalService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/internal`,
            ValidationMiddleware(Validate.getTxListInternal),
            this.getTxListInternal
        )
    }

    private getTxListInternal = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { address } = req.body;
            res.status(200).json(await this.TxListInternalService.getTxListInternal(address));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default TxListInternalController;