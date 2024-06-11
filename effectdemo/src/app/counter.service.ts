import { Injectable } from '@angular/core';
import { signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  private _counter = signal(0);

  get counter() {
    return this._counter;
  }

  increment() {
    this._counter.set(this._counter() + 1);
  }

  get doubleCounter() {
    return computed(() => this._counter() * 2);
  }
}
