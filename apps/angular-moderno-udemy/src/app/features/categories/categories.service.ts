import { inject, Injectable, signal } from '@angular/core';
// import { toObservable } from '@angular/core/rxjs-interop';
import { APIService } from '@api/api.service';
import { environment } from '@envs/environment';
import { tap } from 'rxjs';
// import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  //readonly categories$ = new BehaviorSubject<string[]>([]);
  categories = signal<string[]>([]); //signal para las categorias
  // categories$ = toObservable(this.categories); //observable para las categorias, en caso que no queramos usar signal
  private readonly _endPoint = `${environment.API_URL_FAKE_STORE}/products/categories`;
  private readonly _apiService = inject(APIService);

  constructor() {
    this._getCategories();
  }

  private _getCategories(): void {
    //this.categories$.next(categories)
    this._apiService
      .get<string[]>(this._endPoint)
      .pipe(tap((categories: string[]) => this.categories.set(categories)))
      .subscribe();
  }
}
