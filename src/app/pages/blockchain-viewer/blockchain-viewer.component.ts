import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';
import { Block } from 'src/app/models/Block';

@Component({
  selector: 'app-blockchain-viewer',
  templateUrl: './blockchain-viewer.component.html',
  styleUrls: ['./blockchain-viewer.component.css']
})
export class BlockchainViewerComponent implements OnInit {

  public blocks: Block[];
  public selectedBlock: Block;

  constructor(private blockchainService: BlockchainService) {
    this.blocks = blockchainService.blockchainInstance.chain;
    this.selectedBlock = this.blocks[0];
    console.log(this.blocks);
   }

  ngOnInit() {
  }

  showTransaction(block: Block): boolean {
    this.selectedBlock = block;
    return false;
  }

  blockHasTx(block: Block): boolean {
    return block.transactions.length > 0;
  }

  selectedBlockHasTx(): boolean {
    return this.blockHasTx(this.selectedBlock);
  }

  isSelectedBlock(block: Block): boolean {
    return this.selectedBlock === block;
  }

  getBlockNumber(block: Block) {
    return this.blocks.indexOf(block) + 1;
  }
}
