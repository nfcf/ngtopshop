import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { JasperoAlertsModule } from '@jaspero/ng2-alerts';
import { DialogModule, PanelModule } from 'primeng/primeng';

import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule } from './authentication/authentication.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ProductService } from './products/services';
import { OrderService } from './orders/services';

import { CustomRouterStateSerializer } from './shared/utils';
import { AuthService, DbService, RouteGuardService, UserService } from './shared/services';

import { reducers, metaReducers } from './state/reducers';
import { OrderEffects, ProductEffects, RouterEffects, UserEffects } from './state/effects';

import { environment } from '../environments/environment';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule,
    EffectsModule.forRoot([OrderEffects, ProductEffects, RouterEffects, UserEffects]),

    AppRoutingModule,
    AuthenticationModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    JasperoAlertsModule,
    DialogModule,
    PanelModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  providers: [
    AuthService,
    DbService,
    RouteGuardService,
    OrderService,
    ProductService,
    UserService,
    /**
     * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
     * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
     * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
     */
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
