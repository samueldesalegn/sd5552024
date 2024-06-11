import { Component } from '@angular/core';

import { CounterComponent } from './counter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CounterComponent],
  template: '<app-counter />',
  
})
export class AppComponent {
  title = 'signal-app';
}
