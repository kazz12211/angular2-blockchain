import { Component, OnInit } from '@angular/core';
import { Blockchain } from 'src/app/models/Blockchain';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public blockchain: Blockchain;

  constructor(private blockchainService: BlockchainService) {
    this.blockchain = blockchainService.blockchainInstance;
   }

  ngOnInit() {
  }

}
