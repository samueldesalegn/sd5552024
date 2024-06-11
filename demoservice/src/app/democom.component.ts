// democom.component.ts
import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-democom',
  standalone: true,
  template: ` <p>Data from DemoCom Component: {{ data }}</p> `,
  providers: [DataService],
})
export class DemoComComponent {
  data: string;

  constructor(private dataService: DataService) {
    this.data = this.dataService.getData();
  }
}
