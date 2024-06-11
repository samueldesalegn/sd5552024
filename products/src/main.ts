import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { ProductService } from './app/data';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    {
      provide: ProductService,
      useFactory: (http: HttpClient) => new ProductService(http),
      deps: [HttpClient],
    },
  ],
}).catch((err) => console.error(err));
