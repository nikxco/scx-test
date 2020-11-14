import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => {
    const textNode = document.createTextNode('Unable to start the quiz, please refresh the app to try again.');
    const body = document.querySelector('body');
    body.style.color = 'red';
    body.appendChild(textNode)
  });
