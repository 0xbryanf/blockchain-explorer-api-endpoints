import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import EthLatestPriceService from '@/resources/Ethereum/Goerli/Stats/getEthLatestPrice/getEthLatestPrice.service';

class EthLatestPriceController implements Controller {
    public path = '/get-eth-latestprice';
    public router = Router();
    private EthLatestPriceService = new EthLatestPriceService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            this.getEthLatestPrice
        )
    }

    private getEthLatestPrice = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            res.status(200).json(await this.EthLatestPriceService.getEthLatestPrice());
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default EthLatestPriceController;