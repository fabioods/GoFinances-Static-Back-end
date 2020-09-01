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
    const balance = this.transactionsRepository.getBalance();
    const currentValue = balance.total - value;
    if (type === 'outcome' && currentValue < 0) {
      throw Error('You can not outcome more than you have!');
    }
    const t = this.transactionsRepository.create({ title, value, type });
    return t;
  }
}

export default CreateTransactionService;
