import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import EthTotalSupplyService from '@/resources/Ethereum/Goerli/Stats/getEthTotalSupply/getEthTotalSupply.service';

class EthTotalSupplyController implements Controller {
    public path = '/get-eth-totalsupply';
    public router = Router();
    private EthTotalSupplyService = new EthTotalSupplyService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            this.getEthTotalSupply
        )
    }

    private getEthTotalSupply = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            res.status(200).json(await this.EthTotalSupplyService.getEthTotalSupply());
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default EthTotalSupplyController;