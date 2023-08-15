import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import Validate from '@/resources/Ethereum/Goerli/Tokens/getERC20TokenTotalSupply/getERC20TokenTotalSupply.validation';
import GoerliERC20TokenTotalSupplyService from '@/resources/Ethereum/Goerli/Tokens/getERC20TokenTotalSupply/getERC20TokenTotalSupply.service';

class GoerliERC20TokenTotalSupplyController implements Controller {
    public path = '/goerli';
    public router = Router();
    private GoerliERC20TokenTotalSupplyService = new GoerliERC20TokenTotalSupplyService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/get-erc20token-totalsupply`,
            ValidationMiddleware(Validate.getERC20TokenTotalSupply),
            this.getERC20TokenTotalSupply
        )
    }

    private getERC20TokenTotalSupply = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { contractAddress } = req.body;
            res.status(200).json(await this.GoerliERC20TokenTotalSupplyService.getERC20TokenTotalSupply(contractAddress));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default GoerliERC20TokenTotalSupplyController;
