import { Block } from './Block';
import { Transaction } from './Transaction';

export class Blockchain {
    chain: Block[];
    difficulty: number;
    pendingTransactions: Transaction[];
    miningReward: number;

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(): Block {
        return new Block(Date.parse('2019-01-01'), [], '0');
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(rewardAddress: string) {
        const rewardTx = new Transaction(null, rewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [];
    }

    addTransaction(transaction: Transaction) {
        if(!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('Transaction must include from and to address');
        }

        if(!transaction.isValid()) {
            throw new Error('Transaction is invalid');
        }

        if(transaction.amount <= 0) {
            throw new Error('Transaction amount should be larger than 0');
        }

        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address: string): number {
        let balance = 0;

        for(const block of this.chain) {
            for(const trans of block.transactions) {
                if(trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if(trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    getAllTransactionsForWallet(address: string): Transaction[] {
        const txs = [];
        for(const block of this.chain) {
            for(const tx of block.transactions) {
                if(tx.fromAddress === address || tx.toAddress === address) {
                    txs.push(tx);
                }
            }
        }

        return txs;
    }

    isValid(): boolean {
        const gen = JSON.stringify(this.createGenesisBlock());
        if(gen !== JSON.stringify(this.chain[0])) {
            return false;
        }

        for(let i = 1; i < this.chain.length; i++) {
            const currBlock = this.chain[i];
            if(!currBlock.hasValidTransactions()) {
                return false;
            }

            if(currBlock.hash != currBlock.calculateHash()) {
                return false;
            }
        }
        return true;
    }
}