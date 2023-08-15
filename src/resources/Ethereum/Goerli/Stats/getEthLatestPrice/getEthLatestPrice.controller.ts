import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import GoerliEthLatestPriceService from '@/resources/Ethereum/Goerli/Stats/getEthLatestPrice/getEthLatestPrice.service';

class GoerliEthLatestPriceController implements Controller {
    public path = '/goerli';
    public router = Router();
    private GoerliEthLatestPriceService = new GoerliEthLatestPriceService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/get-eth-latestprice`,
            this.getEthLatestPrice
        )
    }

    private getEthLatestPrice = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            res.status(200).json(await this.GoerliEthLatestPriceService.getEthLatestPrice());
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default GoerliEthLatestPriceController;