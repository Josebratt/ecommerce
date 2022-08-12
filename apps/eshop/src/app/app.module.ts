import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OrdersModule } from './../../../../libs/orders/src/lib/orders.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PrimengModule } from './primeng/primeng.module';
import { NavComponent } from './shared/nav/nav.component';

import { UiModule } from '@ecommerce/ui';
import { ProductsModule } from '@ecommerce/products';
import { JwtInterceptor, UsersModule } from '@ecommerce/users';


const routes: Routes = [
  { path: '', component: HomePageComponent },
]

@NgModule({
  declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    OrdersModule,
    ProductsModule,
    UiModule,
    PrimengModule,
    UsersModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
