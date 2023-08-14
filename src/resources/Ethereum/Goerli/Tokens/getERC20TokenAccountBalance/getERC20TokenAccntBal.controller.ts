import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import Validate from '@/resources/Ethereum/Goerli/Tokens/getERC20TokenAccountBalance/getERC20TokenAccntBal.validation';
import ERC20TokenAccntBalService from '@/resources/Ethereum/Goerli/Tokens/getERC20TokenAccountBalance/getERC20TokenAccntBal.service';

class ERC20TokenAccntBalController implements Controller {
    public path = '/get-erc20token-accountbalance';
    public router = Router();
    private ERC20TokenAccntBalService = new ERC20TokenAccntBalService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/for-token-contractaddress`,
            ValidationMiddleware(Validate.getERC20TokenAccountBalance),
            this.getERC20TokenAccntBalance
        )
    }

    private getERC20TokenAccntBalance = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { contractAddress, address } = req.body;
            res.status(200).json(await this.ERC20TokenAccntBalService.getERC20TokenAccountBalance(contractAddress, address));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default ERC20TokenAccntBalController;
