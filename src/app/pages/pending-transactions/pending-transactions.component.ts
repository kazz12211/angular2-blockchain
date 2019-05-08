import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Transaction } from 'src/app/models/Transaction';

@Component({
  selector: 'app-pending-transactions',
  templateUrl: './pending-transactions.component.html',
  styleUrls: ['./pending-transactions.component.css']
})
export class PendingTransactionsComponent implements OnInit {
  public pendingTransactions: Transaction[] = [];
  public miningInProgress: boolean = false;
  public txAdded: boolean = false;

  constructor(private blockchainService: BlockchainService, private router: Router, private route: ActivatedRoute) { 
    this.pendingTransactions = blockchainService.getPendingTrasactions();
  }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('addedTx')) {
      this.txAdded = true;

      setTimeout( () => {
        this.txAdded = false;
      }, 4000);
    }
  }
  
  minePendingTransactions() {
    this.miningInProgress = true;
    this.blockchainService.minePendingTransactions();
    this.miningInProgress = false;
    this.router.navigate(['/']);
  }
}
