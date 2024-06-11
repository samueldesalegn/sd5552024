import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  effect,
} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <p>Counter: {{ counter() }}</p>
      <p>Double Counter: {{ doubleCounter() }}</p>
      <button (click)="increment()">Increment</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AppComponent {
  counter = signal(0);

  doubleCounter = computed(() => this.counter() * 2);

  constructor() {
    effect(() => {
      console.log(`Counter value: ${this.counter()}`);
    });
  }

  increment() {
    this.counter.set(this.counter() + 1);
  }
}
