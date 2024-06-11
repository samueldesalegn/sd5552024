import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
    <div>
      <p>Signal A: {{ a() }}</p>
      <p>Signal B: {{ b() }}</p>
      <p>Sum: {{ sum() }}</p>
      <button (click)="increment()">Increment</button>
      <button (click)="callSum()">Call sum()</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
})
export class AppComponent {
  a = signal(5);
  b = signal(9);
  sum = computed(() => {
    console.log('Recalculating');
    return this.a() + this.b();
  });

  increment() {
    this.a.set(this.a() + 1);
    this.b.set(this.b() + 1);
  }

  callSum() {
    console.log(`Sum: ${this.sum()}`);
  }
}
