import { AsyncPipe, NgFor } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '@features/categories/categories.service';
import { CategoryButtonComponent } from '../category-button/category-button.component';
import { ProductsService } from '@features/products/products.service';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [NgFor, AsyncPipe, CategoryButtonComponent],
  styleUrl: './category-filter.component.scss',
  template: `
    <h2 class="heading">
      <span class="highlight">Popular</span>
      categories
    </h2>
    <ul class="list-container">
      <!-- TODO: Can be an  component -->
      <li>
        <app-category-button
          category="ALL"
          [(filterCategory)]="selectedCategory"
        />
        <!-- <button type="button" (click)="onClick('all')" class="btn btn-hover">
          {{ 'ALL' }}
        </button> -->
      </li>
      <!-- TODO: Can be an  component -->
      <!-- <li *ngFor="let category of categories$ | async; trackBy: trackById">
        <button type="button" (click)="onClick(category)" class="btn btn-hover">
          {{ category }}
        </button>
      </li> -->
      @for (category of categories(); track category) {
      <li>
        <app-category-button
          [category]="category"
          [(filterCategory)]="selectedCategory"
        />
      </li>
      }
    </ul>
  `,
})
export class CategoryFilterComponent {
  readonly categories = inject(CategoryService).categories;

  selectedCategory = signal<string>('ALL'); //signal que va filtar por seleccionado en categoria
  private readonly _productService = inject(ProductsService);

  // el effect es el calback que observa o avisa cuando hay algun cambio , lo usaremos en el filter
  constructor() {
    effect(
      () =>
        this._productService.filterProductsByCategory(this.selectedCategory()),
      {
        allowSignalWrites: true, // Permite que el efecto escriba en señales
      }
    );
  }

  //private readonly _router = inject(Router);

  // onClick(category: string): void {
  //   this._router.navigate([], {
  //     queryParams: { category: category === 'all' ? null : category },
  //     queryParamsHandling: 'merge',
  //     replaceUrl: true,
  //   });
  // }

  trackById(index: number, category: string): string {
    return category;
  }
}
