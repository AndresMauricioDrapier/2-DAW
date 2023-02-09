import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, HammerModule } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, RouteReuseStrategy, withPreloading } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app/app.component';

import { APP_ROUTES } from './app/routes';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
    importProvidersFrom(IonicModule.forRoot()),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(HammerModule)
  ],
});
