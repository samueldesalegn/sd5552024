// app.config.ts
import { ApplicationConfig, InjectionToken, inject } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const PET_NAME = new InjectionToken<string>('Pet_Name');
export const PET_FACTORY = new InjectionToken<{ name: string }>('Pet_Factory');
export class PET_CLASS {
  name = 'Theo';
}

const pet_factory = () => {
  const pet_name = inject(PET_NAME);
  return { name: pet_name };
};

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: PET_NAME, useValue: 'Theo' },
    { provide: PET_FACTORY, useFactory: pet_factory },
    { provide: PET_CLASS, useClass: PET_CLASS },
  ],
};
