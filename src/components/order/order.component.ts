import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductModel } from '../../models/product.model';
import { CoinsService } from '../../services/coins.service';
import { take } from 'rxjs';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent {
  @Input() products!: ProductModel[];
  @Output() makePurchase = new EventEmitter<ProductModel>();
  
  inputOrderControl = new FormControl('', [Validators.maxLength(2)]);

  constructor(private coinsService: CoinsService, private messagesService: MessagesService) {}

  setValue(val: string): void {
    if (this.inputOrderControl.value && this.inputOrderControl.value.length === 2) return;

    this.inputOrderControl.setValue(this.inputOrderControl.value + val);
  }

  onDeleteLastSymbol(): void {
    if (!this.inputOrderControl.value) return;

    this.inputOrderControl.setValue(this.inputOrderControl.value.slice(0, -1));
  }

  onReset(): void {
    this.inputOrderControl.setValue('');
  }

  onBuy(): void {
    if (!this.inputOrderControl.value || this.inputOrderControl.value.length < 2) {
      this.messagesService.setErrorMessage('Order code should be two characters');
      return;
    }

    const foundProduct = this.products.find(item => item.id === this.inputOrderControl.value);

    if (!foundProduct) {
      this.messagesService.setErrorMessage('Your code is not valid!');
      return;
    }

    if (foundProduct.quantity === 0) {
      this.messagesService.setErrorMessage('This product is out of stock!');
      return;
    }

    const change = this.calculateChange(foundProduct.price);

    if (change < 0) {
      this.messagesService.setErrorMessage('Not enough money for this item! Please add more!');
      return;
    }

    this.makePurchase.emit(foundProduct);
    foundProduct.quantity -= 1;
    this.onReset();
    this.messagesService.setSuccessMessage(`You have successfully purchased ${foundProduct.label}! Get your change ${(change /100).toFixed(2)}€`);
    this.coinsService.resetBalance();
  }

  private calculateChange(itemPrice: number): number {
      let balance = 0;
      this.coinsService.balanceObs$.pipe(take(1)).subscribe(value => {
        balance = value;
      })

      return balance - itemPrice;
  }
}
