import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/menu/menu.component';
import { CardViewComponent } from './components/card-view/card-view.component';

import { SharedMaterialModule } from './shared/shared-material/shared-material.module';
import { AddExpenseComponent } from './shared/add-expense/add-expense.component';
import { FormComponent } from './shared/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';

import localePt from '@angular/common/locales/pt';
import { ExpenseComponent } from './components/expense/expense.component';
import { HomeComponent } from './components/home/home.component';
import { AccountsComponent } from './components/accounts/accounts.component';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CardViewComponent,
    AddExpenseComponent,
    FormComponent,
    ExpenseComponent,
    HomeComponent,
    AccountsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
