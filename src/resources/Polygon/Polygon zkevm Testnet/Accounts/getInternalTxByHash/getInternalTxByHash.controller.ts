import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import Validate from '@/resources/Polygon/Polygon zkevm Testnet/Accounts/getInternalTxByHash/getInternalTxByHash.validation';
import PolyZKEVMTestnetTxByHashService from '@/resources/Polygon/Polygon zkevm Testnet/Accounts/getInternalTxByHash/getInternalTxByHash.service';

class PolyZKEVMTestnetTxByHashController implements Controller {
    public path = '/polygon-zkevm-testnet';
    public router = Router();
    private PolyZKEVMTestnetTxByHashService = new PolyZKEVMTestnetTxByHashService();

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
            res.status(200).json(await this.PolyZKEVMTestnetTxByHashService.getTxByHash(txHash));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default PolyZKEVMTestnetTxByHashController;