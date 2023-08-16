import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import Validate from '@/resources/Polygon/Polygon zkevm Testnet/Accounts/getTxListNormal/getTxListNormal.validation';
import PolyZKEVMTestnetTxListNormalService from '@/resources/Polygon/Polygon zkevm Testnet/Accounts/getTxListNormal/getTxListNormal.service';

class PolyZKEVMTxListNormalController implements Controller {
    public path = '/polygon-zkevm-testnet';
    public router = Router();
    private PolyZKEVMTestnetTxListNormalService = new PolyZKEVMTestnetTxListNormalService();

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
            res.status(200).json(await this.PolyZKEVMTestnetTxListNormalService.getTxListNormal(address));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default PolyZKEVMTxListNormalController;
