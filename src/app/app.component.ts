import { Component, OnInit } from '@angular/core';
import { BlockchainService } from './services/blockchain.service';
import { Blockchain } from './models/Blockchain';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public blockchain: Blockchain;
  public showInfoMessage: boolean = true;

  constructor(private blockchainService: BlockchainService) {
    this.blockchain = blockchainService.blockchainInstance;
  }

  ngOnInit(): void {
  }

  thereArePendingTransactions() {
    return this.blockchain.pendingTransactions.length > 0;
  }

  dismissInfoMessage() {
    this.showInfoMessage = false;
  }
}
