import { Injectable } from '@angular/core';
import { Blockchain } from '../models/Blockchain';
import { ec as EC } from 'elliptic';
import { Transaction } from '../models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  public blockchainInstance: Blockchain = new Blockchain();
  public walletKeys: Array<IWalletKey> = [];

  constructor() { 
    this.blockchainInstance.minePendingTransactions('Hello');
    this.generateWalletKeys();
  }

  minePendingTransactions() {
    this.blockchainInstance.minePendingTransactions(
      this.walletKeys[0].publicKey
    );
  }

  addressIsFromCurrentUser(address: string): boolean {
    return address === this.walletKeys[0].publicKey;
  }

  generateWalletKeys() {
    const ec = new EC('secp256k1');
    const key = ec.genKeyPair();

    this.walletKeys.push(
      {
        keyObj: key,
        publicKey: key.getPublic('hex'),
        privateKey: key.getPrivate('hex').toString()
      }
    );

    console.log(this.walletKeys);
  }

  getPendingTrasactions(): Transaction[] {
    return this.blockchainInstance.pendingTransactions;
  }

  addTransaction(tx: Transaction) {
    this.blockchainInstance.addTransaction(tx);
  }
}

export interface IWalletKey {
  keyObj: any;
  publicKey: string;
  privateKey: string;
}