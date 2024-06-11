import { Component } from '@angular/core';
import { ChildComponent } from "./child.component"; // Import the ChildComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChildComponent], // Add ChildComponent to the imports array
  template: `
    <h1>Welcome to {{ title }}!</h1>
    <p>Message from child: {{ childmessage }}</p>
    <app-child
      [childData]="parentData"
      (childEvent)="handleChildEvent($event)"
    />
  `,
  styles: [],
})
export class AppComponent {
  title = 'democommunication';
  parentData = 'Hello son!';
  childmessage = '';
  handleChildEvent(event: string) {
    this.childmessage = event;
    console.log('Event from child:', event);
  }
}
