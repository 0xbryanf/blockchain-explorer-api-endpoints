import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import Validate from '@/resources/Ethereum/Goerli/Transactions/getContractStatus/getContractStatus.validation';
import ContractStatusService from '@/resources/Ethereum/Goerli/Transactions/getContractStatus/getContractStatus.service';

class ContractStatusController implements Controller {
    public path = '/get-contract-transaction';
    public router = Router();
    private ContractStatusService = new ContractStatusService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/status`,
            ValidationMiddleware(Validate.getContractStatus),
            this.getContractStatus
        )
    }

    private getContractStatus = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { txHash } = req.body;
            res.status(200).json(await this.ContractStatusService.getContractStatus(txHash));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default ContractStatusController;