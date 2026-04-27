import { CurrencyPipe, NgClass, NgFor, NgIf, SlicePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartStore } from 'apps/angular-moderno-udemy/src/app/store/cart-state/cart-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, SlicePipe, CurrencyPipe, NgClass, NgFor, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  // @Input() cart!: CartStore | null;
  cart = input.required<CartStore | null>(); // signal input ( input en minuscula)
  showCart = false;
}
