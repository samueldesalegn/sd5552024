import { Component } from '@angular/core';
import { model } from '@angular/core';

@Component({
  selector: 'child',
  standalone: true,
  template: `
    <button (click)="send()">send to parent</button>
    {{ $msg() }}
  `,
})
export class ChildComponent {
  $msg = model<string>();

  send() {
    this.$msg.set('hello father');
  }
}
