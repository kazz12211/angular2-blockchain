import { Transaction } from './Transaction';
import { SHA256 } from 'crypto-js';

export class Block {
    previousHash: string;
    timestamp: number;
    transactions: Transaction[];
    nonce: number;
    hash: string;

    constructor(timestamp: number, transactions: Transaction[], previouseHash = '') {
        this.previousHash = previouseHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash(): string {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty: number) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log(`Block mined: ${this.hash}`);
    }

    hasValidTransactions(): boolean {
        for(const tx of this.transactions) {
            if(!tx.isValid()) {
                return false;
            }
        }
        return true;
    }
}