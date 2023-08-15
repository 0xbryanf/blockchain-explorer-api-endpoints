import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import Validate from '@/resources/Ethereum/Goerli/Accounts/getTxListNormal/getTxListNormal.validation';
import GoerliTxListNormalService from '@/resources/Ethereum/Goerli/Accounts/getTxListNormal/getTxListNormal.service';

class GoerliTxListNormalController implements Controller {
    public path = '/goerli';
    public router = Router();
    private GoerliTxListNormalService = new GoerliTxListNormalService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/get-normaltx`,
            ValidationMiddleware(Validate.getTxListNormal),
            this.getTxListNormal
        )
    }

    private getTxListNormal = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { address } = req.body;
            res.status(200).json(await this.GoerliTxListNormalService.getTxListNormal(address));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default GoerliTxListNormalController;
