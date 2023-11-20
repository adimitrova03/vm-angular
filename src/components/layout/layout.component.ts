import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '../products/products.component';
import { ProductsService } from '../../services/products.service';
import { ProductsModel } from '../../models/products.model';
import { Observable, debounceTime, map, tap } from 'rxjs';
import { OrderComponent } from '../order/order.component';
import { CoinsComponent } from '../coins/coins.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProductModel } from '../../models/product.model';
import { MessagesService } from '../../services/messages.service';
import { MessageType } from '../../enums/message-type.enum';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, ProductsComponent, OrderComponent, CoinsComponent, MatProgressSpinnerModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  public products: Observable<ProductsModel> = this.productService.getProducts();
  public imageName: string = '';
  public message: string = '';
  public selectedProduct: ProductModel | undefined;

  constructor(
    public readonly messagesService: MessagesService,
    private readonly productService: ProductsService,
  ) {}

  ngOnInit(): void {
    let type: MessageType;

    this.messagesService.messagesObs$.pipe(
      map(resp => {
        this.message = resp.text;
        type = resp.type;
      }),
      debounceTime(2000),
      tap(() => {
        if (this.selectedProduct) {
              this.imageName = this.selectedProduct.name;
              this.selectedProduct = undefined;
        }
      }),
      debounceTime(2000),
      tap(() => {
        if (type === MessageType.Initial) return;

        this.message = ''
        this.imageName = '';

        if (type === MessageType.Success) this.messagesService.setInitialMessage();
      })
    ).subscribe();
  }

  onMakePurchase(product: ProductModel): void {
    this.selectedProduct = product;
  }
}
