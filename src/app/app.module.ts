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
import { LoginComponent } from './components/login/login.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { CurrentBalanceComponent } from './components/current-balance/current-balance.component';
import { RevenuesComponent } from './components/revenues/revenues.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AddRevenuesComponent } from './components/add-revenues/add-revenues.component';
import { MonthsComponent } from './components/months/months.component';
import { UpdateExpenseComponent } from './components/update-expense/update-expense.component';
import { MonthsRevenuesComponent } from './components/months-revenues/months-revenues.component';
import { UpdateRevenuesComponent } from './components/update-revenues/update-revenues.component';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CardViewComponent,
    AddExpenseComponent,
    FormComponent,
    ExpenseComponent,
    LoginComponent,
    AccountsComponent,
    ProgressBarComponent,
    CurrentBalanceComponent,
    RevenuesComponent,
    RegisterComponent,
    DashboardComponent,
    AddRevenuesComponent,
    MonthsComponent,
    UpdateExpenseComponent,
    MonthsRevenuesComponent,
    UpdateRevenuesComponent
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
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
