import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import Validate from '@/resources/Ethereum/Goerli/Blocks/getBlockNumber/getBlockNumber.validation';
import GoerliBlockNumberService from '@/resources/Ethereum/Goerli/Blocks/getBlockNumber/getBlockNumber.service';

class GoerliBlockNumberController implements Controller {
    public path = '/goerli';
    public router = Router();
    private GoerliBlockNumberService = new GoerliBlockNumberService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/get-blocknumber-bytimestamp`,
            ValidationMiddleware(Validate.getBlockNumber),
            this.getBlockNumber
        )
    }

    private getBlockNumber = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { timeStamp } = req.body;
            res.status(200).json(await this.GoerliBlockNumberService.getBlockNumber(timeStamp));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default GoerliBlockNumberController;