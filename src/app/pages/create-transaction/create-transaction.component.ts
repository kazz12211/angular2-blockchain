import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/Transaction';
import { IWalletKey, BlockchainService } from 'src/app/services/blockchain.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent implements OnInit {

  public newTx: Transaction;
  public walletKey: IWalletKey;

  constructor(private blockchainService: BlockchainService, private router: Router) {
    this.newTx = new Transaction('', '', 0);
    this.walletKey = blockchainService.walletKeys[0];
  }

  ngOnInit() {
  }

  createTransaction() {
    const newTx = this.newTx;

    newTx.fromAddress = this.walletKey.publicKey;
    newTx.sign(this.walletKey.keyObj);

    try {
      this.blockchainService.addTransaction(this.newTx);
    } catch (e) {
      alert(e);
      return;
    }

    this.router.navigate(['/new/transaction/pending', { addedTx: true }]);
    this.newTx = new Transaction('', '', 0);
  }
}
