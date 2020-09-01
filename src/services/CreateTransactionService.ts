import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!['outcome', 'income'].includes(type)) {
      throw Error('Transaction type is invalid');
    }
    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && total < value) {
      throw Error('You do not have enough money for this transaction');
    }
    const t = this.transactionsRepository.create({ title, value, type });
    return t;
  }
}

export default CreateTransactionService;
