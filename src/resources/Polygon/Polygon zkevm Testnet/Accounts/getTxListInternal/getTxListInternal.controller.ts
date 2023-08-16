import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import Validate from '@/resources/Polygon/Polygon zkevm Testnet/Accounts/getTxListInternal/getTxListInternal.validation';
import PolyZKEVMTestnetTxListInternalService from '@/resources/Polygon/Polygon zkevm Testnet/Accounts/getTxListInternal/getTxListInternal.service';

class PolyZKEVMTestnetTxListInternalController implements Controller {
    public path = '/polygon-zkevm-testnet';
    public router = Router();
    private PolyZKEVMTestnetTxListInternalService = new PolyZKEVMTestnetTxListInternalService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/get-internaltx`,
            ValidationMiddleware(Validate.getTxListInternal),
            this.getTxListInternal
        )
    }

    private getTxListInternal = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { address } = req.body;
            res.status(200).json(await this.PolyZKEVMTestnetTxListInternalService.getTxListInternal(address));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default PolyZKEVMTestnetTxListInternalController;