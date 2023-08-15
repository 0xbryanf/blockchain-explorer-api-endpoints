import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import GoerliEthTotalSupplyService from '@/resources/Ethereum/Goerli/Stats/getEthTotalSupply/getEthTotalSupply.service';

class GoerliEthTotalSupplyController implements Controller {
    public path = '/goerli';
    public router = Router();
    private GoerliEthTotalSupplyService = new GoerliEthTotalSupplyService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/get-eth-totalsupply`,
            this.getEthTotalSupply
        )
    }

    private getEthTotalSupply = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            res.status(200).json(await this.GoerliEthTotalSupplyService.getEthTotalSupply());
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default GoerliEthTotalSupplyController;