import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

// interface Request {
//   title: string;
//   type: string;
//   value: number;
// }

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Transaction): Transaction {
    
    const balance = this.transactionsRepository.getBalance();
    if(type == 'outcome' && (balance.total - value) < 0){
      throw Error("Your Balance is Insufficient");      
    }

    const transaction = this.transactionsRepository.create({ id: "", title, type, value });

    console.log(transaction);

    return transaction;
    
  }
}

export default CreateTransactionService;
