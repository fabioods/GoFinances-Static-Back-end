import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface TransactionBalance {
  transactions: Transaction[];
  balace: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public getTransactionBalance(): TransactionBalance {
    return {
      transactions: this.all(),
      balace: this.getBalance(),
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(t => t.type === 'income')
      .reduce((total, t) => total + t.value, 0);
    const outcome = this.transactions
      .filter(t => t.type === 'outcome')
      .reduce((total, t) => total + t.value, 0);
    const total = income - outcome;
    const balace: Balance = {
      income,
      outcome,
      total,
    };
    return balace;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const t = new Transaction({ title, value, type });
    this.transactions.push(t);
    return t;
  }
}

export default TransactionsRepository;
