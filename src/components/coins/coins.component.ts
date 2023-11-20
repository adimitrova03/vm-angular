import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCoinsDialogComponent } from '../select-coins-dialog/select-coins-dialog.component';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { CoinsService } from '../../services/coins.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-coins',
  standalone: true,
  imports: [CommonModule, MatDialogModule, SelectCoinsDialogComponent],
  templateUrl: './coins.component.html',
  styleUrl: './coins.component.scss',
})
export class CoinsComponent implements OnInit, OnDestroy {
  balance = 0;
  
  private readonly destroy = new Subject<void>();

  constructor(
    public readonly coinsService: CoinsService,
    private readonly dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.coinsService.balanceObs$.pipe(takeUntil(this.destroy)).subscribe((resp: number) => {
      this.balance = resp /100;
    })
  }

  chooseCoins(): void {
    this.dialog.open(SelectCoinsDialogComponent, {
      width: '590px',
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
