import { EntityRepository, Repository, getConnection, getRepository } from 'typeorm';

import { PaymentHistory } from './entities/paymentHistory.entity';

@EntityRepository(PaymentHistory)
export class PurchaseRepository extends Repository<PaymentHistory> {

}