import { Component, EventEmitter, Input, Output, input } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  template: `
    <p>child works!</p>
    <p>Message from Father: {{ childData() }}</p>
    <button (click)="sendEvent()">Send Event to Parent</button>
  `,
  styles: ``,
})
export class ChildComponent {
  childData = input('');
  @Output() childEvent = new EventEmitter<string>();

  sendEvent() {
    this.childEvent.emit('Hello Father!');
  }
}
