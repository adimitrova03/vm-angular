import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinsService } from '../../services/coins.service';
import { take } from 'rxjs';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef } from '@angular/material/dialog';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-select-coins-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './select-coins-dialog.component.html',
  styleUrl: './select-coins-dialog.component.scss'
})
export class SelectCoinsDialogComponent {

  constructor(
    private coinsService: CoinsService,
    private messagesService: MessagesService,
    public dialogRef: MatDialogRef<SelectCoinsDialogComponent>
  ) {}

  addCoin(newValue: number): void {
    this.coinsService.balanceObs$.pipe(take(1)).subscribe((value) => {
      this.coinsService.balance.next(value + newValue);
    });
  }

  resetBalance(): void {
    this.messagesService.setInitialMessage();
    this.coinsService.resetBalance();
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
