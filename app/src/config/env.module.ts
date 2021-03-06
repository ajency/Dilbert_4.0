import { NgModule } from '@angular/core';
import { EnvVariables } from './env.token';
import { devVariables } from './dev';
import { prodVariables } from './prod';

declare const process: any; // Typescript compiler will complain without this

export function environmentFactory() {

  if(process.env.NODE_ENV === 'production'){
    return prodVariables;
  }
  else if(process.env.NODE_ENV === 'development'){
    return devVariables;
  }

  // return process.env.IONIC_ENV === 'prod' ? prodVariables : devVariables;
  return devVariables;
}

@NgModule({
  providers: [
    {
      provide: EnvVariables,
      // useFactory instead of useValue so we can easily add more logic as needed.
      useFactory: environmentFactory
    }
  ]
})
export class EnvironmentsModule {}