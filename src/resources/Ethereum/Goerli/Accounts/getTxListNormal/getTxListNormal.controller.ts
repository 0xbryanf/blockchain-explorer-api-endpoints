import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import Validate from '@/resources/Ethereum/Goerli/Accounts/getTxListNormal/getTxListNormal.validation';
import TxListNormalService from '@/resources/Ethereum/Goerli/Accounts/getTxListNormal/getTxListNormal.service';

class TxListNormalController implements Controller {
    public path = '/get-transaction-list';
    public router = Router();
    private TxListNormalService = new TxListNormalService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/normal`,
            ValidationMiddleware(Validate.getTxListNormal),
            this.getTxListNormal
        )
    }

    private getTxListNormal = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { address } = req.body;
            res.status(200).json(await this.TxListNormalService.getTxListNormal(address));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default TxListNormalController;
