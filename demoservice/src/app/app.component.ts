// app.component.ts
import { Component, inject, InjectionToken } from '@angular/core';
import { PET_NAME, PET_FACTORY, PET_CLASS } from './app.config';
import { DataService } from './data.service';
import { DemoComComponent } from "./democom.component";

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <h1>Angular Injection Example</h1>
    <p>Pet Name: {{ petName }}</p>
    <p>Pet from Factory: {{ petFactory.name }}</p>
    <p>Pet from Class: {{ petClass.name }}</p>
    <p>Data from Service: {{ data }}</p>
    <app-democom></app-democom>
  `,
    imports: [DemoComComponent]
})
export class AppComponent {
  dataService = inject(DataService);
  petName = inject(PET_NAME);
  petFactory = inject<{ name: string }>(PET_FACTORY);
  petClass = inject(PET_CLASS);

  data: string;

  constructor() {
    this.data = this.dataService.getData();
  }
}
