import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts.component';
import { CurrentBalanceComponent } from './components/current-balance/current-balance.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: 'despesas', component: ExpenseComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'contas', component: AccountsComponent
  },
  {
    path: 'saldo-atual', component: CurrentBalanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
