import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  // private isLoadingSubject = new BehaviorSubject<boolean>(false);
  // isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  readonly isLoading = signal<boolean>(false);
  show(): void {
    // this.isLoadingSubject.next(true);
    this.isLoading.set(true);
  }

  hide(): void {
    this.isLoading.set(false);
  }
}
