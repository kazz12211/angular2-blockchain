import { SHA256 } from 'crypto-js';
import * as EC from 'elliptic'

const ec = new EC.ec('secp256k1');

export class Transaction {
    fromAddress: string;
    toAddress: string;
    amount: number;
    timestamp: number;
    signature: string;

    constructor(fromAddress: string, toAddress: string, amount: number) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.timestamp = Date.now();
    }

    calculateHash(): string {
        return SHA256(this.fromAddress + this.toAddress + this.amount + this.timestamp).toString();
    }

    sign(signingKey: EC.ec.KeyPair) {
        if(signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error('You cannot sign transactions for other wallets');
        }

        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');

        this.signature = sig.toDER('hex');
    }

    isValid(): boolean {
        if(this.fromAddress === null)
            return true;

        if(!this.signature || this.signature.length === 0) {
            throw new Error('No signature is this transaction');
        }

        const pubKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return pubKey.verify(this.calculateHash(), this.signature);
    }
}