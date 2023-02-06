import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  provideRouter,
  withPreloading,
  PreloadAllModules,
  RouteReuseStrategy,
} from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { authTokenInterceptor } from './app/interceptors/auth-token.interceptor';
import { baseUrlInterceptor } from './app/interceptors/base-url.interceptor';

import { APP_ROUTES } from './app/routes';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { provideArcgisToken } from './app/shared/maps/arcgis-maps.config';

if (environment.production) {
  enableProdMode();
}

GoogleAuth.initialize({
  clientId:
    '746820501392-nc4pet9ffnm8gq8hg005re9e6ho65nua.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  grantOfflineAccess: true,
});

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([baseUrlInterceptor, authTokenInterceptor])
    ),
    provideArcgisToken(
      'AAPKc2940b004f38491b869000328dd73685GNKiJxJwOBscpCvz9Pxpae-LVDdvsqr_p6VDTqAas1Kj7idPwcMZqSc-fuDAY91R'
    ),
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
    importProvidersFrom(IonicModule.forRoot()),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
});
