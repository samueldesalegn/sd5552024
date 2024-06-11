import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChildComponent], // Add ChildComponent to the declarations array
  template: `
    <p>{{ $data() }}</p>
    <button (click)="sendToChild()">send to child</button>
    <child [($msg)]="$data" />
  `,
})
export class AppComponent {
  $data = signal('initial value');

  sendToChild() {
    this.$data.set('hello son');
  }
}
