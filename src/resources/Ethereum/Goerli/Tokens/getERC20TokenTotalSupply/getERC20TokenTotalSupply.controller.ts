import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import Validate from '@/resources/Ethereum/Goerli/Tokens/getERC20TokenTotalSupply/getERC20TokenTotalSupply.validation';
import ERC20TokenTotalSupplyService from '@/resources/Ethereum/Goerli/Tokens/getERC20TokenTotalSupply/getERC20TokenTotalSupply.service';

class ERC20TokenTotalSupplyController implements Controller {
    public path = '/get-erc20token-totalsupply';
    public router = Router();
    private ERC20TokenTotalSupplyService = new ERC20TokenTotalSupplyService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/bycontractaddress`,
            ValidationMiddleware(Validate.getERC20TokenTotalSupply),
            this.getERC20TokenTotalSupply
        )
    }

    private getERC20TokenTotalSupply = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { contractAddress } = req.body;
            res.status(200).json(await this.ERC20TokenTotalSupplyService.getERC20TokenTotalSupply(contractAddress));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default ERC20TokenTotalSupplyController;
