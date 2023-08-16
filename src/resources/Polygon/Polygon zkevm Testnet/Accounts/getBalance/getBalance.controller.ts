import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import Validate from '@/resources/Polygon/Polygon zkevm Testnet/Accounts/getBalance/getBalance.validation';
import PolyZKEVMTestnetBalanceService from '@/resources/Polygon/Polygon zkevm Testnet/Accounts/getBalance/getBalance.service';

class PolyZKEVMTestnetBalanceController implements Controller {
    public path = '/polygon-zkevm-testnet';
    public router = Router();
    private PolyZKEVMTestnetBalanceService = new PolyZKEVMTestnetBalanceService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/get-balance`,
            ValidationMiddleware(Validate.getBalance),
            this.getBalance
        )
    }

    private getBalance = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { address } = req.body;
            res.status(200).json(await this.PolyZKEVMTestnetBalanceService.getBalance(address));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default PolyZKEVMTestnetBalanceController;