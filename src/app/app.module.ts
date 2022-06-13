import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { starComponent } from './shared/star.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './products/product-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
    starComponent,
    ProductDetailComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([

      { path: 'products', component: ProductListComponent },
      /** Tells compoent the id of the product to display. Id is parameter */
      { path: 'products/:id', component: ProductDetailComponent },
      
      { path: 'welcome', component: WelcomeComponent },
      /** when application loads, it redirects to welcome page */
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      /** if url doesnt match, redirects to welcome page */
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
