import { computed, inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Product } from '@features/products/product.interface';
//import { Console, error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { CartCalculatorService } from 'src/app/store/cart-state/cart-calculator.service';

export interface CartStore {
  products: Product[];
  totalAmount: number;
  productsCount: number;
}

export const initialCartState: CartStore = {
  products: [],
  totalAmount: 0,
  productsCount: 0,
};

@Injectable({ providedIn: 'root' })
export class CartStateService {
  // private readonly _cartState = new BehaviorSubject<CartStore>(
  //   initialCartState
  // );

  private readonly _cartCalculatorService = inject(CartCalculatorService);
  private readonly _toastrService = inject(ToastrService);

  //signal
  private readonly _products = signal<Product[]>([]);
  readonly totalAmount = computed(() => this._cartCalculatorService.calculateTotal(this._products()));
  readonly productsCount = computed(() => this._cartCalculatorService.calculateItemsCount(this._products()));

  readonly cartStore = computed(() => ({
    products: this._products(),
    productsCount: this.productsCount(),
    totalAmount: this.totalAmount(),
  }));

  // cart$ = this._cartState.asObservable();
  //cart$ = toObservable(this.cartStore);// ponemos la signal

  // updateState(newState: CartStore): void {
  //   this._cartState.next(newState);
  // }

  // getCurrentState(): CartStore {
  //   return this._cartState.getValue();
  // }
  addToCart(product: Product): void {
    // const currentState = this._cartState.getValue();
    const currentProducts = this._products();
    //const updatedProducts = [...currentState.products];
    const existingProductIndex = currentProducts.findIndex(
      (p: Product) => p.id === product.id
    );
    if (existingProductIndex >= 0) {
      currentProducts[existingProductIndex] = {
        ...product,
        quantity: (currentProducts[existingProductIndex].quantity || 0) + 1,
      };
      this._products.set(currentProducts);
    } else {
      // updatedProducts.push({ ...product, quantity: 1 });
      this._products.update((products: Product[]) => [
        ...products,
        { ...product, quantity: 1 },
      ]);
    }
    // this.updateState({
    //   products: updatedProducts,
    //   totalAmount: this._cartCalculatorService.calculateTotal(updatedProducts),
    //   productsCount:
    //     this._cartCalculatorService.calculateItemsCount(updatedProducts),
    // });
    this._toastrService.success('Product added!!', 'DOMINI STORE');
  }

  removeFromCart(productId: number): void {
    try {
      if (!productId) {
        throw new Error('INVALIDO PRODUCTO ID');
      }
      const currenproduct = this._products();
      //some devuelve true o false
      const productExist = currenproduct.some(
        (product: Product) => product.id === productId
      );

      if (!productExist) {
        this._toastrService.warning('product no found in cart');
        return;
      }

      this._products.update((products: Product[]) =>
        products.filter((product: Product) => product.id !== productId)
      );
      this._toastrService.success('Product removed!!', 'DOMINI STORE');
    } catch (error) {
      console.error('RROR Product removING!!', 'DOMINI STORE');

      this._toastrService.success('RROR Product removING!!', 'DOMINI STORE');
    }
    // const currentState = this._cartState.getValue();
    // const updatedProducts = currentState.products.filter(
    //   (p) => p.id !== productId
    // );
    // this.updateState({
    //   products: updatedProducts,
    //   totalAmount: this._cartCalculatorService.calculateTotal(updatedProducts),
    //   productsCount:
    //     this._cartCalculatorService.calculateItemsCount(updatedProducts),
    // });
    // this._toastrService.success('Product removed!!', 'DOMINI STORE');
  }

  clearCart(): void {
    this._products.set([]);
    // this.updateState(initialCartState);
    this._toastrService.success('All Products removed!', 'DOMINI STORE');
  }
}
