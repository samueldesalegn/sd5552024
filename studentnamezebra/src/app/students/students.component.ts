import { Component } from '@angular/core';
import { NgClass, TitleCasePipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-students',
  standalone: true,
  template: `
    <ul>
      @for(student of students; track student._id; let even = $even, i = $index) {
      <li [ngClass]="{ grey: even }">
        {{ i }} -
        {{
          student.name.length > 5
            ? (student.name | slice : 0 : 5).trim() + '...'
            : student.name
        }}
      </li>
      }
    </ul>
  `,
  styles: [
    `
      .grey {
        background-color: green;
      }
    `,
  ],
  imports: [NgClass, TitleCasePipe, SlicePipe],
})
export class StudentsComponent {
  students = [
    { _id: '1', name: 'asaad saad' },
    { _id: '2', name: 'theo saad' },
    { _id: '3', name: 'mike saad' },
    { _id: '4', name: 'mada saad' },
    { _id: '5', name: 'NG' },
  ];
}
