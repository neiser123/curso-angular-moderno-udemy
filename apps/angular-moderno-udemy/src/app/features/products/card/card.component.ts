import { CurrencyPipe, SlicePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Input,
  output,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@features/products/product.interface';

import { AddToCartComponent } from '@shared/ui/add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink, AddToCartComponent, CurrencyPipe, SlicePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  //@Input({ required: true }) product!: Product;
  currenproduct = input.required<Product>({ alias: 'product' }); //input signals
  // @Output() addToCartEvent = new EventEmitter<Product>();
  addToCartEvent = output<Product>(); //outputs signals
  onAddToCart(): void {
    this.addToCartEvent.emit(this.currenproduct());
  }
}
