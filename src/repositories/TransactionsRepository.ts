import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance: Balance = { income: 0, outcome: 0, total: 0 };

    const totalTransactions = this.transactions.reduce((total, transaction) => {
      if (transaction.type == 'income') {
        return balance.income += transaction.value;
      } else {
        return balance.outcome += transaction.value;
      }
    }, 0);

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, type, value }: Transaction): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
