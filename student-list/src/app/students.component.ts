import { Component } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { TitleCasePipe } from './title-case.pipe';
import { TruncatePipe } from './truncate.pipe';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, TitleCasePipe, TruncatePipe, NgStyle],
  template: `
    <div>
      <ul>
        @for (student of students; track student; let i = $index, o = $odd){

        <li [ngStyle]="{ 'background-color': o ? 'white' : 'grey' }">
          {{ student.name | titleCase | truncate : 20 }}
        </li>
        }
      </ul>
    </div>
  `,
  styles: [
    `
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        padding: 8px;
      }
    `,
  ],
})
export class StudentsComponent {
  students = [
    { _id: '1', name: 'asaad saad' },
    { _id: '2', name: 'theo saad' },
    { _id: '3', name: 'mike saad' },
    { _id: '4', name: 'mada saad' },
    { _id: '5', name: 'i could not find more than 20 chars names' },
  ];
}
