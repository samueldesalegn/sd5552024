import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <div>
      <h1>Counter: {{ $count() }}</h1>
      @if ($is_prime()) {
        <p>The number {{ $count() }} is a prime number!</p>
      } @else {
        <p>The number {{ $count() }} is not a prime number.</p>
      }
      
    </div>
  `,
  styles: [
    `
      h1 {
        font-size: 2em;
        margin-bottom: 0.5em;
      }
      p {
        font-size: 1.5em;
      }
    `,
  ],
})
export class CounterComponent {
  $count = signal(0);

  constructor() {
    setInterval(() => this.$count.update((c) => c + 1), 1000);

    effect(() => {
      if (this.$is_prime()) {
        console.log(`Found a Prime number: ${this.$count()}`);
      }
    });
  }

  $is_prime = computed(() => this.isPrime(this.$count()));

  private isPrime(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  }
}
