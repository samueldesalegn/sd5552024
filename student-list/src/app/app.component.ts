import { Component } from '@angular/core';
import { StudentsComponent } from "./students.component";

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <h1>Welcome to {{title}}!</h1>
    <app-students />

    
  `,
    styles: [],
    imports: [StudentsComponent]
})
export class AppComponent {
  title = 'student-list';
}
